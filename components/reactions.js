"use client";

import React, { useState, useEffect, useRef } from "react";

export default function ReactionBar({ jokeId }) {
    const availableEmojis = ["😂", "❤️", "👍", "😮", "😢", "😡"];

    const [reactions, setReactions] = useState({});
    const [userReaction, setUserReaction] = useState(null);
    const [showPicker, setShowPicker] = useState(false);
    const [showSummary, setShowSummary] = useState(false);

    const pickerRef = useRef(null);
    const summaryRef = useRef(null);
    const wrapperRef = useRef(null);

    // ✅ Load localStorage data *after* client mounts (avoids hydration issues)
    useEffect(() => {
        try {
            const savedReactions = localStorage.getItem(`reactions_${jokeId}`);
            const savedUserReactions = localStorage.getItem("userReactions");

            if (savedReactions) setReactions(JSON.parse(savedReactions));

            if (savedUserReactions) {
                const userMap = JSON.parse(savedUserReactions);
                if (userMap[jokeId]) setUserReaction(userMap[jokeId]);
            }
        } catch {
            console.warn("Failed to read localStorage for reactions");
        }
    }, [jokeId]);

    // ✅ Persist reactions in localStorage
    const persistReactions = (obj) => {
        try {
            localStorage.setItem(`reactions_${jokeId}`, JSON.stringify(obj));
        } catch { }
    };

    // ✅ Persist user’s personal reaction
    const persistUserReaction = (emojiOrNull) => {
        try {
            const userMap = JSON.parse(localStorage.getItem("userReactions") || "{}");
            if (emojiOrNull === null) delete userMap[jokeId];
            else userMap[jokeId] = emojiOrNull;
            localStorage.setItem("userReactions", JSON.stringify(userMap));
        } catch { }
    };

    // ✅ Handle emoji selection or toggle
    const handleSelect = (emoji) => {
        setReactions((prev) => {
            const updated = { ...prev };

            // Toggle off if user selects same emoji again
            if (userReaction === emoji) {
                if (updated[emoji]) {
                    updated[emoji] -= 1;
                    if (updated[emoji] <= 0) delete updated[emoji];
                }
                persistReactions(updated);
                setUserReaction(null);
                persistUserReaction(null);
                setShowPicker(false);
                return updated;
            }

            // Remove old reaction
            if (userReaction && updated[userReaction]) {
                updated[userReaction] -= 1;
                if (updated[userReaction] <= 0) delete updated[userReaction];
            }

            // Add new reaction
            updated[emoji] = (updated[emoji] || 0) + 1;

            persistReactions(updated);
            setUserReaction(emoji);
            persistUserReaction(emoji);
            setShowPicker(false);
            return updated;
        });
    };

    // ✅ Handle outside click (closes popups)
    useEffect(() => {
        const handleClickOutside = (e) => {
            if (
                !pickerRef.current?.contains(e.target) &&
                !summaryRef.current?.contains(e.target) &&
                !wrapperRef.current?.contains(e.target)
            ) {
                setShowPicker(false);
                setShowSummary(false);
            }
        };

        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    const totalReacts = Object.values(reactions).reduce((a, b) => a + b, 0);
    const activeEmojis = Object.keys(reactions);

    return (
        <div
            ref={wrapperRef}
            className="relative flex items-center gap-2 text-sm select-none"
        >
            {/* ✅ Cluster showing active emojis + total count */}
            {activeEmojis.length > 0 && (
                <button
                    onClick={() => {
                        setShowSummary((s) => !s);
                        setShowPicker(false);
                    }}
                    className="flex items-center gap-1 rounded-full bg-gray-100 px-3 py-1 text-sm hover:bg-gray-200 transition"
                >
                    {activeEmojis.map((emoji) => (
                        <span key={emoji}>{emoji}</span>
                    ))}
                    <span className="ml-1 text-xs text-gray-500 font-medium">
                        {totalReacts}
                    </span>
                </button>
            )}

            {/* ✅ Static reaction button (does not change on react) */}
            <div className="relative">
                <button
                    onClick={() => {
                        setShowPicker((s) => !s);
                        setShowSummary(false);
                    }}
                    className="flex items-center gap-1 rounded-full bg-gray-200 px-3 py-1 text-base hover:bg-gray-300 transition"
                >
                    <span>😃</span>
                    <span className="text-sm text-gray-600 font-medium">+</span>
                </button>

                {/* ✅ Emoji Picker Popup */}
                {showPicker && (
                    <div
                        ref={pickerRef}
                        className="absolute -top-14 left-0 flex gap-2 bg-white border border-gray-200 rounded-2xl shadow-lg px-4 py-2 transition-all transform origin-bottom"
                        style={{ zIndex: 50 }}
                    >
                        {availableEmojis.map((emoji) => (
                            <button
                                key={emoji}
                                onClick={() => handleSelect(emoji)}
                                disabled={emoji === userReaction}
                                className={`text-xl transition-transform hover:scale-125 ${emoji === userReaction ? "opacity-60 cursor-not-allowed" : ""
                                    }`}
                            >
                                {emoji}
                            </button>
                        ))}
                    </div>
                )}
            </div>

            {/* ✅ Summary Breakdown Popup */}
            {showSummary && (
                <div
                    ref={summaryRef}
                    className="absolute left-0 top-10 bg-white border border-gray-200 rounded-lg shadow-lg p-2 flex flex-col gap-1 text-sm z-40"
                >
                    {Object.entries(reactions).map(([emoji, count]) => (
                        <div
                            key={emoji}
                            className="flex items-center justify-between px-2 w-20"
                        >
                            <span>{emoji}</span>
                            <span className="text-xs text-gray-600">{count}</span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}
