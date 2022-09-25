import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import {
  setFieldInputStyleProperty,
  setFieldTitleStyleProperty,
  setMainButtonStyleProperty,
  setMainDescriptionStyleProperty,
  setMainTitleStyleProperty,
} from '../../../actions/formEditor'
import ColorPicker from '../../../components/input/ColorPicker'
import { selectEditorFormStyles } from '../../../selectors/formEditor'

const FormColors = () => {
  const [color, setColor] = useState('#fffff')
  const styles = useSelector(selectEditorFormStyles)
  const dispatch = useDispatch()
  const mainStyles = styles?.main || {}

  const changeMainTitleColor = (value: any) => {
    dispatch(setMainTitleStyleProperty({ key: 'color', value }))
  }

  const changeMainDescriptionColor = (value: any) => {
    dispatch(setMainDescriptionStyleProperty({ key: 'color', value }))
  }

  const changeMainButtonColor = (value: any) => {
    dispatch(setMainButtonStyleProperty({ key: 'background', value }))
  }

  const changeFieldTitleColor = (value: any) => {
    dispatch(setFieldTitleStyleProperty({ key: 'color', value }))
  }

  const changeInputColor = (value: any) => {
    dispatch(setFieldInputStyleProperty({ key: 'color', value }))
  }

  return (
    <div>
      <ColorPicker
        color={mainStyles.title.color}
        onChange={(color: any) => changeMainTitleColor(color)}
        label="Titles"
        mb={10}
      />
      <ColorPicker
        color={mainStyles.description.color}
        onChange={(color: any) => changeMainDescriptionColor(color)}
        label="Subtitles"
        mb={10}
      />
      <ColorPicker
        color={styles.fields.title.color}
        onChange={(color: any) => changeFieldTitleColor(color)}
        label="Questions"
        mb={10}
      />
      <ColorPicker
        color={styles.fields.input.color}
        onChange={(color: any) => changeInputColor(color)}
        label="Inputs"
        tooltip="input"
        mb={10}
      />
      <ColorPicker
        color={styles.main.button.background}
        onChange={(color: any) => changeMainButtonColor(color)}
        label="Buttons"
        tooltip="Buttons"
        mb={10}
      />
    </div>
  )
}

export default FormColors
