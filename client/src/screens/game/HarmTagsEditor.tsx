import React, { useState } from 'react'
import { HarmTagType } from '../../api/contests'
import { HarmTagEditor } from './HarmTagEditor'

export interface HarmTagsEditorProps {
    onChange: (harmTags: HarmTagType[]) => void
}

export const HarmTagsEditor = ({ onChange }: HarmTagsEditorProps) => {
    const tags: { name: string, value: HarmTagType }[] = [
        { name: 'Sacred', value: 'sacred' },
        { name: 'Perilous', value: 'perilous' },
        { name: 'Mythic', value: 'mythic' },
        { name: 'Epic', value: 'epic' }
    ]

    const [selectedTags, setSelectedTags] = useState([] as HarmTagType[])

    return <>
        {tags.map(({ name, value }) =>
            <HarmTagEditor
                key={`tag-editor-${value}`}
                name={name}
                onChange={(toggled: boolean) => {
                    let next = [...selectedTags]
                    if (toggled) {
                        next.push(value)
                    } else {
                        const idx = selectedTags.findIndex(x => x === value)
                        next.splice(idx, 1)
                    }
                    setSelectedTags(next)
                    onChange(next)
                }}
            />)}
    </>
}
