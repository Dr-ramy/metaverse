'use client';
import React, { useState } from 'react';
import { DialogueNode } from '@/app/hooks/npcDialogues';

export default function DialogueSystem({
  dialogue,
  onSubmit,
  onStartListening,
  listening,
}: {
  dialogue: DialogueNode;
  onSubmit: (message: string) => void;
  onClose?: () => void;
  onStartListening: () => void;
  listening: boolean;
  onOptionClick?: (text: string) => void;
}) {
  const [inputValue, setInputValue] = useState('');

  const handleSubmit = () => {
    if (inputValue.trim() === '') return;
    onSubmit(inputValue.trim());
    setInputValue('');
  };

  return (
    <div
      className="position-fixed top-0 start-0 mt-3 px-3"
      style={{ zIndex: 1050, width: 'auto', pointerEvents: 'none' }}
    >
      <div
        className="card bg-dark text-white shadow-lg mx-auto"
        style={{ maxWidth: '400px', pointerEvents: 'auto' }}
      >
        <div className="card-body position-relative">
          {/* ❌ زر الإغلاق تمت إزالته */}

          <p className="card-text mb-3">{dialogue.message}</p>

          <input
            type="text"
            className="form-control mb-2 bg-secondary text-white border-0"
            placeholder="Message..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') handleSubmit();
            }}
          />

          <div className="d-grid gap-2">
            <button className="btn btn-primary" onClick={handleSubmit}>
              Send
            </button>

            <button
              className={`btn ${listening ? 'btn-success' : 'btn-secondary'}`}
              onClick={onStartListening}
            >
              {listening ? 'Stop' : 'Talk'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
