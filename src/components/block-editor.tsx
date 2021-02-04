import { createElement } from '@wordpress/element'
import {
    BlockEditorKeyboardShortcuts,
    BlockEditorProvider,
    BlockInspector,
    BlockList,
    Inserter,
    ObserveTyping,
    WritingFlow
} from '@wordpress/block-editor'
import { serialize } from '@wordpress/blocks'
import { Button, Popover } from '@wordpress/components'
import { undo as undoIcon, redo as redoIcon } from '@wordpress/icons'

import Header from './header'
import Sidebar from './sidebar'
import InserterToggle from './inserter-toggle'
import EditorSettings from '../interfaces/editor-settings'
import Block from '../interfaces/block'
import { useDispatch } from '@wordpress/data'

interface BlockEditorProps {
    settings: EditorSettings,
    blocks: Block[],
    onChange: (value: string) => void,
    updateBlocks: (blocks: Block[]) => void,
    undo?: () => void,
    redo?: () => void,
    canUndo?: boolean,
    canRedo?: boolean
}

const BlockEditor = ({ settings, onChange, blocks, updateBlocks, undo, redo, canUndo, canRedo }: BlockEditorProps) => {
    const handleInput = (blocks: Block[]) => {
        updateBlocks(blocks)
    }

    const handleChange = (blocks: Block[]) => {
        updateBlocks(blocks)
        onChange(serialize(blocks))
    }

    return (
        <div className="laraberg-editor">
            <BlockEditorProvider
                value={blocks}
                onInput={handleInput}
                onChange={handleChange}
                settings={settings}
            >
                <Header.HeaderFill>
                    <Inserter renderToggle={InserterToggle} />
                    <Button icon={undoIcon} onClick={undo} disabled={!canUndo} className={'history-button'} />
                    <Button icon={redoIcon} onClick={redo} disabled={!canRedo} className={'history-button'} />
                </Header.HeaderFill>
                <Sidebar.InspectorFill>
                    <BlockInspector />
                </Sidebar.InspectorFill>
                <div className="editor-styles-wrapper">
                    <BlockEditorKeyboardShortcuts />
                    <Popover.Slot
                        // @ts-ignore
                        name="block-toolbar"
                    />
                    <WritingFlow>
                        <ObserveTyping>
                            <BlockList />
                        </ObserveTyping>
                    </WritingFlow>
                    <Popover.Slot />
                </div>
            </BlockEditorProvider>
        </div>
    );
};

export default BlockEditor;
