import React, { Fragment, useState } from 'react'
import ReactQuill from 'react-quill'
import 'react-quill/dist/quill.snow.css'
import { Box, Flex } from 'rebass'
import { EventStep } from '../../../types'
import { LeftArrowButton, RightArrowButton } from '../../common'
import { BaseStep } from './base-step'

interface Props extends EventStep {
  description?: string
  setDescription: (description: string) => void
}

const modules = {
  toolbar: [
    [{ header: '1' }],
    ['bold', 'italic', 'underline'],
    [{ list: 'ordered' }, { list: 'bullet' }],
    ['link'],
    ['clean'],
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  },
}

const formats = [
  'header',
  'font',
  'size',
  'bold',
  'italic',
  'underline',
  'strike',
  'blockquote',
  'list',
  'bullet',
  'indent',
  'link',
  'image',
  'video',
]

export const DescriptionStep = ({
  toPrevStep,
  toNextStep,
  setDescription,
  description,
}: Props) => {
  const [editorState, setEditorState] = useState(description || '')

  const toNext = () => {
    setDescription(editorState)
    toNextStep()
  }

  const handleChange = (value: string) => {
    setEditorState(value)
  }

  return (
    <Fragment>
      <BaseStep title="Tarkempi kuvaus">
        <Box p={2}>
          <ReactQuill
            modules={modules}
            formats={formats}
            theme="snow"
            onChange={handleChange}
            value={editorState}
            placeholder="Anna tarkempi kuvaus..."
          />
        </Box>

        <Flex
          my={4}
          width="100%"
          alignItems="center"
          justifyContent="space-between"
        >
          <LeftArrowButton onClick={toPrevStep} visible={true} />
          <RightArrowButton onClick={toNext} visible={true} />
        </Flex>
      </BaseStep>
    </Fragment>
  )
}
