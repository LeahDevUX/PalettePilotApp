'use client';

import { useState } from 'react';
import Header from '../client/components/Header';
import Sidebar from '../client/components/Sidebar';
import GeneratorInput from '../client/components/GeneratorInput';
import PaletteGrid from '../client/components/PaletteGrid';
import MyProjects from '../client/components/MyProjects';
import { PRESETS } from '../client/constants/presets';
import { generateRandomHex } from '../client/utils/colorUtils';
import mockPalettes from '../client/data/mockPalettes.json';

const INITIAL_PALETTE = PRESETS[0].palette;

// ספירת הפרויקטים השמורים לתצוגת ה-badge ב-Sidebar
const SAVED_COUNT = mockPalettes.filter((p) => p.status === 'saved').length;

export default function GeneratorPage() {
  const [direction, setDirection] = useState('rtl');
  const [activeTab, setActiveTab] = useState('generator');
  const [prompt, setPrompt] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [palette, setPalette] = useState(INITIAL_PALETTE);
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [editingIndex, setEditingIndex] = useState(null);

  // --- Header ---
  function toggleDirection() {
    setDirection((current) => (current === 'rtl' ? 'ltr' : 'rtl'));
  }

  // --- Sidebar ---
  function handleSelectPreset(preset) {
    setPalette(preset.palette);
    setPrompt(preset.prompt);
    setActiveTab('generator');
  }

  // --- GeneratorInput ---
  function handleTagClick(tagLabel) {
    setPrompt((current) => (current ? `${current} ${tagLabel}` : tagLabel));
  }

  function handleGenerate() {
    setIsGenerating(true);
    setTimeout(() => {
      const randomPreset = PRESETS[Math.floor(Math.random() * PRESETS.length)];
      setPalette((current) =>
        current.map((color, index) =>
          color.locked ? color : randomPreset.palette[index] ?? color
        )
      );
      setIsGenerating(false);
    }, 1200);
  }

  // --- PaletteGrid ---
  function toggleLock(index) {
    setPalette((current) =>
      current.map((color, i) =>
        i === index ? { ...color, locked: !color.locked } : color
      )
    );
  }

  function copyHex(hex) {
    navigator.clipboard?.writeText(hex);
  }

  function updateHex(index, value) {
    setPalette((current) =>
      current.map((color, i) => (i === index ? { ...color, hex: value } : color))
    );
  }

  function updateColorName(index, value) {
    setPalette((current) =>
      current.map((color, i) => (i === index ? { ...color, name: value } : color))
    );
  }

  function shuffle() {
    setPalette((current) =>
      current.map((color) =>
        color.locked ? color : { ...color, hex: generateRandomHex() }
      )
    );
  }

  function save() {
    console.log('שמירת פלטה:', { prompt, palette });
  }

  return (
    <div dir={direction} className="min-h-screen bg-slate-950">
      <Header direction={direction} onToggleDirection={toggleDirection} />

      <div className="max-w-7xl mx-auto px-4 py-8 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            savedCount={SAVED_COUNT}
            direction={direction}
            onSelectPreset={handleSelectPreset}
          />

          <main className="lg:col-span-9 order-1 lg:order-2">
            {activeTab === 'generator' && (
              <div className="flex flex-col gap-8">
                <GeneratorInput
                  prompt={prompt}
                  setPrompt={setPrompt}
                  isGenerating={isGenerating}
                  onGenerate={handleGenerate}
                  onTagClick={handleTagClick}
                />
                <PaletteGrid
                  palette={palette}
                  onToggleLock={toggleLock}
                  onCopy={copyHex}
                  onUpdateHex={updateHex}
                  onShuffle={shuffle}
                  onSave={save}
                  hoveredIndex={hoveredIndex}
                  setHoveredIndex={setHoveredIndex}
                  editingIndex={editingIndex}
                  setEditingIndex={setEditingIndex}
                  onUpdateColorName={updateColorName}
                />
              </div>
            )}

            {activeTab === 'saved' && <MyProjects />}
          </main>

        </div>
      </div>
    </div>
  );
}
