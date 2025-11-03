import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Page, EditorElement } from '../../types';
import { api } from '../../services/mockApiService';
import Spinner from '../../components/common/Spinner';

// This component renders a single element from the page builder content array.
const RenderElement: React.FC<{ element: EditorElement }> = ({ element }) => {
    const { type, content, styles } = element;

    // The wrapper handles block-level layout like alignment and spacing.
    const wrapperStyles: React.CSSProperties = {
        textAlign: styles.textAlign as 'left' | 'center' | 'right' | undefined,
        marginTop: styles.marginTop,
        marginBottom: styles.marginBottom,
        paddingTop: styles.paddingTop,
        paddingRight: styles.paddingRight,
        paddingBottom: styles.paddingBottom,
        paddingLeft: styles.paddingLeft,
    };
    
    // The element styles contain the specific styling for the component itself.
    const elementStyles: React.CSSProperties = { ...styles };
    // Remove layout styles from the element itself as they are handled by the wrapper
    delete elementStyles.textAlign;
    delete elementStyles.marginTop;
    delete elementStyles.marginBottom;
    delete elementStyles.paddingTop;
    delete elementStyles.paddingRight;
    delete elementStyles.paddingBottom;
    delete elementStyles.paddingLeft;


    const renderContent = () => {
        switch (type) {
            case 'heading':
                return <h2 style={elementStyles}>{content}</h2>;
            case 'text':
                return <p style={elementStyles}>{content}</p>;
            case 'button':
                return <button style={elementStyles}>{content}</button>;
            case 'image':
                return <img src={content} alt="" style={elementStyles} />;
            case 'spacer':
                 return <div style={elementStyles}></div>;
            default:
                return null;
        }
    }
    
    return (
      <div style={wrapperStyles}>
        {renderContent()}
      </div>
    );
};

const DynamicPage = () => {
    const { slug } = useParams<{ slug: string }>();
    const [page, setPage] = useState<Page | null | undefined>(undefined);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!slug) return;
        const fetchPage = async () => {
            setLoading(true);
            try {
                const data = await api.getPageBySlug(slug);
                setPage(data);
            } catch (error) {
                console.error("Failed to fetch page:", error);
                setPage(null);
            } finally {
                setLoading(false);
            }
        };
        fetchPage();
    }, [slug]);

    if (loading) {
        return <div className="flex justify-center items-center h-96"><Spinner /></div>;
    }

    if (!page) {
        return (
            <div className="text-center bg-white p-12 rounded-lg shadow-md">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">404 - Page Not Found</h1>
                <p className="text-gray-600">The page you are looking for does not exist or is currently in draft mode.</p>
            </div>
        );
    }

    return (
        <div className="bg-white p-4 sm:p-8 rounded-lg shadow-lg max-w-full mx-auto">
            <h1 className="sr-only">{page.title}</h1>
            <div>
              {page.content.map(element => (
                <RenderElement key={element.id} element={element} />
              ))}
            </div>
        </div>
    );
};

export default DynamicPage;
