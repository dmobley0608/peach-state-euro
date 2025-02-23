'use client'
import React, { useState } from 'react';

export default function TrophyTabs({ children }) {
    const [activeTab, setActiveTab] = useState('hunting');

    return (
        <div>
            <div className="flex justify-center mb-8">
                <div className="inline-flex rounded-lg bg-gray-800 p-1">
                    <button
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'hunting'
                                ? 'bg-green-600 text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('hunting')}
                    >
                        Hunting Trophies
                    </button>
                    <button
                        className={`px-4 py-2 rounded-lg transition-colors ${activeTab === 'fishing'
                                ? 'bg-blue-600 text-white'
                                : 'text-gray-300 hover:text-white'
                            }`}
                        onClick={() => setActiveTab('fishing')}
                    >
                        Fishing Trophies
                    </button>
                </div>
            </div>

            <div className="min-h-[400px]">
                {React.Children.map(children, child => {
                    if (child.props.category === activeTab) {
                        return child;
                    }
                })}
            </div>
        </div>
    );
}

export function TrophyTabPanel({ children, category }) {
    return (
        <div role="tabpanel" className="animate-fadeIn">
            {children}
        </div>
    );
}
