import React, { useState, useEffect } from 'react';
import { ThemeSettings, SavedTheme, BackgroundSetting } from '../../types';
import { api } from '../../services/mockApiService';
import { useSiteAppearance } from '../../hooks/useSiteAppearance';
import Button from '../../components/common/Button';
import Spinner from '../../components/common/Spinner';

const initialThemeSettings: ThemeSettings = {
    header: {
        background: { type: 'solid', color1: '#FFFFFF' },
        textColor: '#111827',
    },
    footer: {
        background: { type: 'solid', color1: '#1F2937' },
        textColor: '#F9FAFB',
    },
};

const generateBackgroundStyle = (bg: BackgroundSetting): React.CSSProperties => {
    if (bg.type === 'gradient' && bg.color2) {
        return { background: `linear-gradient(${bg.direction || 'to right'}, ${bg.color1}, ${bg.color2})` };
    }
    return { backgroundColor: bg.color1 };
};

const AdminThemeSettingsPage = () => {
    const [currentSettings, setCurrentSettings] = useState<ThemeSettings>(initialThemeSettings);
    const [savedThemes, setSavedThemes] = useState<SavedTheme[]>([]);
    const [newThemeName, setNewThemeName] = useState('');
    const [loading, setLoading] = useState(true);
    const { reloadThemeSettings } = useSiteAppearance();

    useEffect(() => {
        const fetchThemes = async () => {
            setLoading(true);
            try {
                const themes = await api.getSavedThemes();
                setSavedThemes(themes);
                const activeTheme = themes.find(t => t.isActive);
                if (activeTheme) {
                    setCurrentSettings({ header: activeTheme.header, footer: activeTheme.footer });
                }
            } catch (error) {
                console.error("Failed to fetch themes", error);
            } finally {
                setLoading(false);
            }
        };
        fetchThemes();
    }, []);

    const handleSettingChange = (section: 'header' | 'footer', property: 'background' | 'textColor', value: any) => {
        setCurrentSettings(prev => ({
            ...prev,
            [section]: {
                ...prev[section],
                [property]: value,
            },
        }));
    };
    
    const handleBackgroundChange = (section: 'header' | 'footer', bgProperty: keyof BackgroundSetting, value: string) => {
        const newBackground = { ...currentSettings[section].background, [bgProperty]: value };
        handleSettingChange(section, 'background', newBackground);
    };

    const handleSaveTheme = async () => {
        if (!newThemeName.trim()) {
            alert('Please enter a name for the theme.');
            return;
        }
        try {
            const newTheme = await api.saveTheme(newThemeName, currentSettings);
            setSavedThemes(prev => [...prev, newTheme]);
            setNewThemeName('');
        } catch (error) {
            alert('Failed to save theme.');
        }
    };
    
    const handleSetActiveTheme = async (themeId: string) => {
        try {
            await api.setActiveTheme(themeId);
            setSavedThemes(prev => prev.map(t => ({...t, isActive: t.id === themeId })));
            reloadThemeSettings(); // This will update the live site
        } catch (error) {
            alert('Failed to apply theme.');
        }
    };

    const handleDeleteTheme = async (themeId: string) => {
        if (window.confirm('Are you sure you want to delete this theme?')) {
            try {
                const success = await api.deleteTheme(themeId);
                if (success) {
                    setSavedThemes(prev => prev.filter(t => t.id !== themeId));
                } else {
                    alert("Cannot delete the currently active theme.");
                }
            } catch (error) {
                alert('Failed to delete theme.');
            }
        }
    };
    
    const handleLoadTheme = (theme: SavedTheme) => {
        setCurrentSettings({ header: theme.header, footer: theme.footer });
    };

    if (loading) {
        return <div className="flex justify-center items-center h-full"><Spinner /></div>;
    }

    return (
        <div className="bg-gray-800 shadow-lg rounded-lg p-6 text-gray-300">
            <h2 className="text-2xl font-bold text-gray-100 mb-6">Theme Customizer</h2>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Editor Panel */}
                <div className="lg:col-span-1 space-y-6">
                    <ThemeEditorSection title="Header Settings" settings={currentSettings.header} onBackgroundChange={(prop, val) => handleBackgroundChange('header', prop, val)} onTextColorChange={(val) => handleSettingChange('header', 'textColor', val)} />
                    <ThemeEditorSection title="Footer Settings" settings={currentSettings.footer} onBackgroundChange={(prop, val) => handleBackgroundChange('footer', prop, val)} onTextColorChange={(val) => handleSettingChange('footer', 'textColor', val)} />
                </div>
                
                {/* Preview and Management */}
                <div className="lg:col-span-2 space-y-6">
                    {/* Live Preview */}
                    <div>
                        <h3 className="text-xl font-semibold mb-2 text-white">Live Preview</h3>
                        <div className="border border-gray-600 rounded-lg overflow-hidden">
                            <div style={generateBackgroundStyle(currentSettings.header)} className="p-4 text-center font-bold" >
                                <p style={{ color: currentSettings.header.textColor }}>Header Preview</p>
                            </div>
                            <div className="p-8 bg-gray-700 text-center text-sm">
                                <p>Page Content Area</p>
                            </div>
                            <div style={generateBackgroundStyle(currentSettings.footer)} className="p-4 text-center text-sm">
                                <p style={{ color: currentSettings.footer.textColor }}>Footer Preview</p>
                            </div>
                        </div>
                    </div>

                    {/* Saved Themes */}
                    <div className="bg-gray-700 p-4 rounded-lg">
                         <h3 className="text-xl font-semibold mb-4 text-white">Save & Manage Themes</h3>
                         <div className="flex gap-2 mb-4">
                            <input type="text" value={newThemeName} onChange={e => setNewThemeName(e.target.value)} placeholder="New theme name..." className="flex-grow bg-gray-800 border border-gray-600 rounded-md px-3 py-2 focus:ring-primary-500 focus:border-primary-500 text-white" />
                            <Button onClick={handleSaveTheme}>Save Current</Button>
                         </div>
                         <div className="space-y-2">
                            {savedThemes.map(theme => (
                                <div key={theme.id} className="flex justify-between items-center bg-gray-800 p-2 rounded">
                                    <p className="font-medium text-white">{theme.name} {theme.isActive && <span className="text-xs text-green-400 ml-2">(Active)</span>}</p>
                                    <div className="flex gap-2">
                                        <Button variant="secondary" className="!px-2 !py-1 text-xs" onClick={() => handleLoadTheme(theme)}>Load</Button>
                                        <Button variant="secondary" className="!px-2 !py-1 text-xs bg-green-600 hover:bg-green-700 text-white" onClick={() => handleSetActiveTheme(theme.id)} disabled={theme.isActive}>Apply</Button>
                                        <Button variant="secondary" className="!px-2 !py-1 text-xs bg-red-600 hover:bg-red-700 text-white" onClick={() => handleDeleteTheme(theme.id)} disabled={theme.isActive}>Delete</Button>
                                    </div>
                                </div>
                            ))}
                         </div>
                    </div>
                </div>
            </div>
        </div>
    );
};


interface ThemeEditorSectionProps {
    title: string;
    settings: { background: BackgroundSetting; textColor: string };
    onBackgroundChange: (prop: keyof BackgroundSetting, value: string) => void;
    onTextColorChange: (value: string) => void;
}
const ThemeEditorSection: React.FC<ThemeEditorSectionProps> = ({ title, settings, onBackgroundChange, onTextColorChange }) => {
    const gradientDirections = ['to top', 'to right', 'to bottom', 'to left', 'to top right', 'to bottom right', 'to bottom left', 'to top left'];
    return (
        <div className="bg-gray-700 p-4 rounded-lg space-y-4">
            <h3 className="font-semibold text-white">{title}</h3>
            <div>
                <label className="text-sm">Background Type</label>
                <select value={settings.background.type} onChange={e => onBackgroundChange('type', e.target.value)} className="w-full mt-1 bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-white">
                    <option value="solid">Solid Color</option>
                    <option value="gradient">Gradient</option>
                </select>
            </div>
            <div className="flex gap-2 items-center">
                <label className="text-sm">Color 1</label>
                <input type="color" value={settings.background.color1} onChange={e => onBackgroundChange('color1', e.target.value)} className="w-full h-8 bg-transparent" />
            </div>
            {settings.background.type === 'gradient' && (
                <>
                    <div className="flex gap-2 items-center">
                        <label className="text-sm">Color 2</label>
                        <input type="color" value={settings.background.color2 || '#000000'} onChange={e => onBackgroundChange('color2', e.target.value)} className="w-full h-8 bg-transparent" />
                    </div>
                     <div>
                        <label className="text-sm">Direction</label>
                        <select value={settings.background.direction} onChange={e => onBackgroundChange('direction', e.target.value)} className="w-full mt-1 bg-gray-800 border border-gray-600 rounded-md px-3 py-1 text-white">
                           {gradientDirections.map(dir => <option key={dir} value={dir}>{dir}</option>)}
                        </select>
                    </div>
                </>
            )}
            <div className="flex gap-2 items-center">
                <label className="text-sm">Text Color</label>
                <input type="color" value={settings.textColor} onChange={e => onTextColorChange(e.target.value)} className="w-full h-8 bg-transparent" />
            </div>
        </div>
    );
};

export default AdminThemeSettingsPage;