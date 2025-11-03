import React, { useState, useEffect } from 'react';
import { Page, NewPage, EditorElement, ElementType, ElementStyles } from '../../types';
import Button from '../common/Button';
import Spinner from '../common/Spinner';

// --- HELPER FUNCTIONS & CONFIG ---

const slugify = (text: string) => {
    return text.toString().toLowerCase().trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-');
};

// FIX: Changed JSX.Element to React.ReactElement to resolve namespace error.
const WIDGETS: { type: ElementType; name: string; icon: React.ReactElement }[] = [
    { type: 'heading', name: 'Heading', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 012 2v1H10V8a2 2 0 012-2zm0 9h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { type: 'text', name: 'Text', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" /></svg> },
    { type: 'image', name: 'Image', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg> },
    { type: 'button', name: 'Button', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122" /></svg> },
    { type: 'spacer', name: 'Spacer', icon: <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12H8m4 8V4" /></svg> },
];

const getDefaultElement = (type: ElementType): Omit<EditorElement, 'id'> => {
    switch (type) {
        case 'heading': return { type, content: 'New Heading', styles: { fontSize: '24px', fontWeight: 'bold', textAlign: 'left', margin: '16px 0' } };
        case 'text': return { type, content: 'This is a new paragraph.', styles: { fontSize: '16px', textAlign: 'left', margin: '16px 0' } };
        case 'image': return { type, content: 'https://placehold.co/600x400', styles: { width: '100%', height: 'auto', margin: '16px 0' } };
        case 'button': return { type, content: 'Click Me', styles: { backgroundColor: '#3b82f6', color: 'white', padding: '10px 20px', borderRadius: '5px', border: 'none', cursor: 'pointer', margin: '16px 0' } };
        case 'spacer': return { type, content: '', styles: { height: '50px' } };
    }
};

// --- SUB-COMPONENTS ---

const Inspector = ({ element, onUpdate, onClose }: { element: EditorElement | null, onUpdate: (id: string, newStyles: ElementStyles, newContent?: string) => void, onClose: () => void }) => {
    if (!element) return null;

    const updateStyle = (prop: keyof ElementStyles, value: any) => {
        onUpdate(element.id, { ...element.styles, [prop]: value });
    };
    
    const updateContent = (value: string) => {
        onUpdate(element.id, element.styles, value);
    };

    return (
        <div className="w-80 bg-gray-800 text-white text-sm overflow-y-auto p-4 space-y-6">
            <div className="flex justify-between items-center">
                 <h3 className="text-lg font-bold capitalize">{element.type} Settings</h3>
                 <button onClick={onClose} className="text-gray-400 hover:text-white">&times;</button>
            </div>
           
            {/* Content Section */}
            {(element.type === 'heading' || element.type === 'text' || element.type === 'button') && (
                <InspectorSection title="Content">
                    <textarea value={element.content} onChange={e => updateContent(e.target.value)} rows={3} className="w-full bg-gray-700 p-2 rounded mt-1 text-sm"/>
                </InspectorSection>
            )}
             {element.type === 'image' && (
                <InspectorSection title="Content">
                    <label className="text-xs">Image URL</label>
                    <input type="text" value={element.content} onChange={e => updateContent(e.target.value)} className="w-full bg-gray-700 p-2 rounded mt-1 text-sm"/>
                </InspectorSection>
            )}

            {/* Style Section */}
            <InspectorSection title="Style">
                {(element.type === 'heading' || element.type === 'text') && (
                    <>
                    <ColorInput label="Text Color" value={element.styles.color as string} onChange={v => updateStyle('color', v)} />
                    <NumberInput label="Font Size (px)" value={parseInt(element.styles.fontSize as string, 10)} onChange={v => updateStyle('fontSize', `${v}px`)} />
                    <SelectInput label="Font Weight" value={element.styles.fontWeight as string} onChange={v => updateStyle('fontWeight', v)} options={['normal', 'bold', '500', '600', '700']} />
                    </>
                )}
                 {element.type === 'button' && (
                    <>
                    <ColorInput label="Background" value={element.styles.backgroundColor as string} onChange={v => updateStyle('backgroundColor', v)} />
                    <ColorInput label="Text Color" value={element.styles.color as string} onChange={v => updateStyle('color', v)} />
                    <NumberInput label="Border Radius (px)" value={parseInt(element.styles.borderRadius as string, 10)} onChange={v => updateStyle('borderRadius', `${v}px`)} />
                    </>
                )}
                <SelectInput label="Align" value={element.styles.textAlign as string} onChange={v => updateStyle('textAlign', v)} options={['left', 'center', 'right']} />
            </InspectorSection>
            
            {/* Spacing Section */}
            <InspectorSection title="Spacing">
                <SpacingInput label="Margin" value={{ top: element.styles.marginTop, bottom: element.styles.marginBottom }} onChange={(dir, val) => updateStyle(dir === 'top' ? 'marginTop' : 'marginBottom', `${val}px`)} />
                <SpacingInput label="Padding" value={{ top: element.styles.paddingTop, right: element.styles.paddingRight, bottom: element.styles.paddingBottom, left: element.styles.paddingLeft }} onChange={(dir, val) => updateStyle(`padding${dir.charAt(0).toUpperCase() + dir.slice(1)}` as any, `${val}px`)} />
            </InspectorSection>

             {element.type === 'spacer' && (
                <InspectorSection title="Sizing">
                    <NumberInput label="Height (px)" value={parseInt(element.styles.height as string, 10)} onChange={v => updateStyle('height', `${v}px`)} />
                </InspectorSection>
            )}
        </div>
    );
};

// --- Inspector Helper Components ---
const InspectorSection: React.FC<{ title: string, children: React.ReactNode }> = ({ title, children }) => (
    <div className="border-b border-gray-700 pb-4">
        <h4 className="font-semibold mb-2">{title}</h4>
        <div className="space-y-2">{children}</div>
    </div>
);
const NumberInput = ({ label, value, onChange }: { label: string, value: number, onChange: (v: number) => void}) => (
    <div className="flex justify-between items-center">
        <label className="text-xs">{label}</label>
        <input type="number" value={isNaN(value) ? '' : value} onChange={e => onChange(parseInt(e.target.value, 10))} className="w-20 bg-gray-700 p-1 rounded" />
    </div>
);
const ColorInput = ({ label, value, onChange }: { label: string, value: string, onChange: (v: string) => void}) => (
    <div className="flex justify-between items-center">
        <label className="text-xs">{label}</label>
        <input type="color" value={value || '#ffffff'} onChange={e => onChange(e.target.value)} className="w-20 bg-gray-700 p-0 rounded h-6" />
    </div>
);
const SelectInput = ({ label, value, onChange, options }: { label: string, value: string, onChange: (v: string) => void, options: string[]}) => (
    <div className="flex justify-between items-center">
        <label className="text-xs">{label}</label>
        <select value={value} onChange={e => onChange(e.target.value)} className="w-28 bg-gray-700 p-1 rounded capitalize">
            {options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
    </div>
);
const SpacingInput = ({ label, value, onChange }: { label: string, value: any, onChange: (dir: string, val: number) => void }) => {
    const directions = Object.keys(value);
    return (
        <div>
            <label className="text-xs font-semibold">{label}</label>
            <div className="grid grid-cols-2 gap-2 mt-1">
                {directions.map(dir => (
                    <div key={dir} className="flex items-center">
                        <span className="text-xs capitalize w-10">{dir}</span>
                        <input type="number" value={parseInt(value[dir] as string, 10) || 0} onChange={e => onChange(dir, parseInt(e.target.value))} className="w-full bg-gray-700 p-1 rounded" />
                    </div>
                ))}
            </div>
        </div>
    )
};
const WidgetSelectionModal = ({ isOpen, onClose, onSelect }: { isOpen: boolean, onClose: () => void, onSelect: (type: ElementType) => void }) => {
    if (!isOpen) return null;
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-center items-center" onClick={onClose}>
            <div className="bg-gray-800 rounded-lg p-6 w-full max-w-2xl grid grid-cols-3 gap-4" onClick={e => e.stopPropagation()}>
                {WIDGETS.map(widget => (
                    <button key={widget.type} onClick={() => onSelect(widget.type)} className="flex flex-col items-center justify-center bg-gray-700 p-4 rounded-md text-white hover:bg-primary-600 transition-colors">
                        {widget.icon}
                        <span className="mt-2 text-sm">{widget.name}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

// --- MAIN EDITOR ---

const PageEditor: React.FC<{ initialData?: Page; onSave: (pageData: NewPage) => void; isSaving: boolean; }> = ({ initialData, onSave, isSaving }) => {
    const [title, setTitle] = useState('');
    const [slug, setSlug] = useState('');
    const [status, setStatus] = useState<'draft' | 'published'>('draft');
    const [elements, setElements] = useState<EditorElement[]>([]);
    const [selectedElementId, setSelectedElementId] = useState<string | null>(null);
    const [isWidgetModalOpen, setIsWidgetModalOpen] = useState(false);

    useEffect(() => {
        if (initialData) {
            setTitle(initialData.title);
            setSlug(initialData.slug);
            setStatus(initialData.status);
            setElements(initialData.content);
        }
    }, [initialData]);

    const handleTitleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
        if (!initialData?.slug) setSlug(slugify(e.target.value));
    };

    const addElement = (type: ElementType) => {
        const newElement = { id: `el-${Date.now()}`, ...getDefaultElement(type) };
        setElements(prev => [...prev, newElement]);
        setIsWidgetModalOpen(false);
    };
    
    const updateElement = (id: string, newStyles: ElementStyles, newContent?: string) => {
        setElements(prev => prev.map(el => {
            if (el.id === id) {
                return { ...el, styles: newStyles, content: newContent !== undefined ? newContent : el.content };
            }
            return el;
        }));
    };
    
    const deleteElement = (id: string) => {
        if (selectedElementId === id) setSelectedElementId(null);
        setElements(prev => prev.filter(el => el.id !== id));
    };
    
    const duplicateElement = (id: string) => {
        const elementToDuplicate = elements.find(el => el.id === id);
        if (!elementToDuplicate) return;
        const newElement = { ...elementToDuplicate, id: `el-${Date.now()}` };
        const index = elements.findIndex(el => el.id === id);
        setElements(prev => [...prev.slice(0, index + 1), newElement, ...prev.slice(index + 1)]);
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave({ title, slug, status, content: elements });
    };
    
    const selectedElement = elements.find(el => el.id === selectedElementId) || null;

    return (
        <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <input type="text" placeholder="Page Title" value={title} onChange={handleTitleChange} required className="md:col-span-1 w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white" />
                <input type="text" placeholder="url-slug" value={slug} onChange={e => setSlug(e.target.value)} required className="md:col-span-1 w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white font-mono text-sm" />
                <select value={status} onChange={e => setStatus(e.target.value as 'draft' | 'published')} className="md:col-span-1 w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white">
                    <option value="draft">Draft</option>
                    <option value="published">Published</option>
                </select>
            </div>
            
            <div className="flex h-[75vh] border border-gray-600 rounded-lg overflow-hidden bg-gray-900">
                <div className="flex-1 bg-white relative overflow-y-auto p-4 space-y-2">
                    {elements.map(el => (
                       <CanvasElement key={el.id} element={el} isSelected={selectedElementId === el.id} onSelect={setSelectedElementId} onDelete={deleteElement} onDuplicate={duplicateElement} />
                    ))}
                    <div className="text-center my-4">
                        <button type="button" onClick={() => setIsWidgetModalOpen(true)} className="bg-gray-200 text-gray-700 rounded-full h-10 w-10 flex items-center justify-center hover:bg-primary-500 hover:text-white transition-colors">+</button>
                    </div>
                </div>
                {selectedElement && <Inspector element={selectedElement} onUpdate={updateElement} onClose={() => setSelectedElementId(null)}/>}
            </div>

            <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isSaving}>
                    {isSaving ? <><Spinner /> Saving...</> : 'Save Page'}
                </Button>
            </div>
            
            <WidgetSelectionModal isOpen={isWidgetModalOpen} onClose={() => setIsWidgetModalOpen(false)} onSelect={addElement} />
        </form>
    );
};

// FIX: Extracted props to an interface and defined the component as a React.FC
// to resolve the TypeScript error with the `key` prop.
interface CanvasElementProps {
    element: EditorElement;
    isSelected: boolean;
    onSelect: (id: string) => void;
    onDelete: (id: string) => void;
    onDuplicate: (id: string) => void;
}

const CanvasElement: React.FC<CanvasElementProps> = ({ element, isSelected, onSelect, onDelete, onDuplicate }) => {
    const [isHovered, setIsHovered] = useState(false);
    return (
        <div 
          className={`relative p-2 border-2 ${isSelected ? 'border-primary-500' : 'border-transparent hover:border-primary-300'}`} 
          onClick={() => onSelect(element.id)} 
          onMouseEnter={() => setIsHovered(true)} 
          onMouseLeave={() => setIsHovered(false)}
        >
            <div style={{ pointerEvents: 'none' }}>
                <RenderElement element={element} />
            </div>
            {(isSelected || isHovered) && (
                <div className="absolute top-0 right-0 -mt-3 -mr-3 flex space-x-1 bg-primary-600 rounded-md p-1 shadow-lg">
                    <button type="button" onClick={(e) => { e.stopPropagation(); onDuplicate(element.id) }} className="p-1 text-white hover:bg-primary-700 rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" /></svg></button>
                    <button type="button" onClick={(e) => { e.stopPropagation(); onDelete(element.id) }} className="p-1 text-white hover:bg-primary-700 rounded"><svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" /></svg></button>
                </div>
            )}
        </div>
    );
};

// Re-use the renderer from the public page, but without the outer wrapper for alignment.
const RenderElement: React.FC<{ element: EditorElement }> = ({ element }) => {
    const { type, content, styles } = element;
    switch (type) {
        case 'heading': return <h2 style={styles}>{content}</h2>;
        case 'text': return <p style={styles}>{content}</p>;
        case 'button': return <button style={styles} onClick={e => e.preventDefault()}>{content}</button>;
        case 'image': return <img src={content} alt="" style={styles} />;
        case 'spacer': return <div style={styles}></div>;
        default: return null;
    }
};

export default PageEditor;