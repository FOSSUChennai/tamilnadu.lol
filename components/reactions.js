'use client';
import { useState } from "react";

function Reactions(){
    const [pickerOpen, setPickerOpen] = useState(false);
    const emojis = ['👍', '😂', '❤️', '😮', '😢', '😡'];
    const [reactions, setReactions] = useState(
        Object.fromEntries(emojis.map(e => [e, 0]))
    );

    const handleReactionClick = (emoji) => {
        setReactions(prev => ({ ...prev, [emoji]: prev[emoji] + 1 }));
        setPickerOpen(false);
    };

  const activeReactions = Object.entries(reactions).filter(([_, count]) => count > 0);

    return (
        <div className="mt-4 relative flex items-center gap-2">
            {/* Display active reactions */}
            {activeReactions.length > 0 && (
                <div className="flex gap-1 flex-wrap">
                    {activeReactions.map(([emoji, count]) => (
                        <div
                            key={emoji}
                            className="px-2 py-1 bg-gray-200 rounded-full flex items-center text-sm"
                        >
                            {emoji} <span className="ml-1 font-semibold">{count}</span>
                        </div>
                    ))}
                </div>
            )}

            {/* Add reaction button */}
            <div className="relative">
                {pickerOpen && (
                    <div className="flex gap-2 bg-white border rounded-lg p-2 shadow-md absolute -top-12 left-0 z-10">
                        {emojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => handleReactionClick(emoji)}
                                className="text-lg transition hover:scale-125"
                            >
                                {emoji} {reactions[emoji] > 0 ? reactions[emoji] : ''}
                            </button>
                        ))}
                    </div>
                )}

                <button
                    onClick={() => setPickerOpen(!pickerOpen)}
                    className="px-2 py-1 bg-gray-200 rounded-full hover:bg-gray-300 transition flex items-center justify-center w-10 h-10"
                >
                    😃 +
                </button>
            </div>
        </div>
    )

}

export default Reactions;