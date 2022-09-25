import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  IconButton,
  MenuItem,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import ImageIcon from '@mui/icons-material/Image'
import DeleteIcon from '@mui/icons-material/Delete'
import React, { useState } from 'react'
import ColorPicker from '../../../components/input/ColorPicker'
import { useSelector } from 'react-redux'
import { selectEditorFormStyles } from '../../../selectors/formEditor'
import { useDispatch } from 'react-redux'
import {
  setFieldInputStyleProperty,
  setFieldTitleStyleProperty,
  setFormBackgroundProperty,
  setMainButtonStyleProperty,
  setMainDescriptionStyleProperty,
  setMainTitleStyleProperty,
  setQuestionOptionProperty,
} from '../../../actions/formEditor'
import { SelectBackgroundDialog } from './FormSettingsForm'

const fontSizes = [
  '10px',
  '15px',
  '20px',
  '25px',
  '30px',
  '35px',
  '40px',
  '45px',
  '50px',
  '60px',
  '80px',
]

const FormStyles = () => {
  const styles = useSelector(selectEditorFormStyles)
  const [backgroundDialog, setBackgroundDialog] = useState(false)

  const dispatch = useDispatch()

  const changeBackgroundColor = (value: any) => {
    dispatch(setFormBackgroundProperty({ key: 'backgroundColor', value }))
  }

  const changeBackgroundImage = (value: any) => {
    dispatch(setFormBackgroundProperty({ key: 'backgroundImage', value }))
  }

  const handleChangeQuestionTextColor = (color: any) => {
    dispatch(setFieldTitleStyleProperty({ key: 'color', value: color }))
  }

  const handleChangeInputColor = (color: any) => {
    dispatch(setFieldInputStyleProperty({ key: 'color', value: color }))
  }

  return (
    <Box sx={{ p: 0 }}>
      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          General
        </AccordionSummary>
        <AccordionDetails>
          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography gutterBottom>Title</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                select
                variant="standard"
                label="Font size"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.title.fontSize}
                onChange={(e: any) => {
                  dispatch(
                    setMainTitleStyleProperty({
                      key: 'fontSize',
                      value: e.target.value,
                    })
                  )
                }}
              >
                {fontSizes.map((fontSize) => (
                  <MenuItem key={fontSize} value={fontSize}>
                    {fontSize}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="standard"
                label="Font family"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.title.fontFamily}
                onChange={(e: any) => {
                  dispatch(
                    setMainTitleStyleProperty({
                      key: 'fontFamily',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={'Montserrat'}>Montserrat</MenuItem>
                <MenuItem value={'Display fair'}>Display Fair</MenuItem>
              </TextField>
              <TextField
                select
                variant="standard"
                label="Font weight"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.title.fontWeight}
                onChange={(e: any) => {
                  dispatch(
                    setMainTitleStyleProperty({
                      key: 'fontWeight',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={600}>600</MenuItem>
              </TextField>
              <ColorPicker
                tooltip="Color"
                label="Color"
                color={styles.main.title.color}
                onChange={(color: any) => {
                  dispatch(
                    setMainTitleStyleProperty({ key: 'color', value: color })
                  )
                }}
                mb={20}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography gutterBottom>Description</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                select
                variant="standard"
                label="Font size"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.description.fontSize}
                onChange={(e: any) => {
                  dispatch(
                    setMainDescriptionStyleProperty({
                      key: 'fontSize',
                      value: e.target.value,
                    })
                  )
                }}
              >
                {fontSizes.map((fontSize) => (
                  <MenuItem key={fontSize} value={fontSize}>
                    {fontSize}
                  </MenuItem>
                ))}
              </TextField>
              <TextField
                select
                variant="standard"
                label="Font family"
                fullWidth
                sx={{ mb: 2 }}
                value={styles.main.description.fontFamily}
                onChange={(e: any) => {
                  dispatch(
                    setMainDescriptionStyleProperty({
                      key: 'fontFamily',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={'Montserrat'}>Montserrat</MenuItem>
                <MenuItem value={'Display Fair'}>Display Fair</MenuItem>
              </TextField>
              <TextField
                select
                variant="standard"
                label="Font weight"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.description.fontWeight}
                onChange={(e: any) => {
                  dispatch(
                    setMainDescriptionStyleProperty({
                      key: 'fontWeight',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={600}>600</MenuItem>
              </TextField>
              <ColorPicker
                tooltip="Color"
                label="Color"
                color={styles.main.description.color}
                onChange={(color: any) => {
                  dispatch(
                    setMainDescriptionStyleProperty({
                      key: 'color',
                      value: color,
                    })
                  )
                }}
                mb={20}
              />
            </AccordionDetails>
          </Accordion>

          <Accordion>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
              <Typography gutterBottom>Button</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <TextField
                select
                variant="standard"
                label="Font size"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.button.fontSize}
                onChange={(e: any) => {
                  dispatch(
                    setMainButtonStyleProperty({
                      key: 'fontSize',
                      value: e.target.value,
                    })
                  )
                }}
              >
                {fontSizes.map((fontSize) => (
                  <MenuItem key={fontSize} value={fontSize}>
                    {fontSize}
                  </MenuItem>
                ))}
              </TextField>

              <TextField
                select
                variant="standard"
                label="Font family"
                fullWidth
                sx={{ mb: 2 }}
                value={styles.main.button.fontFamily}
                onChange={(e: any) => {
                  dispatch(
                    setMainButtonStyleProperty({
                      key: 'fontFamily',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={'Montserrat'}>Montserrat</MenuItem>
                <MenuItem value={'Display Fair'}>Display Fair</MenuItem>
              </TextField>
              <TextField
                select
                variant="standard"
                label="Font weight"
                sx={{ mb: 2 }}
                fullWidth
                value={styles.main.button.fontWeight}
                onChange={(e: any) => {
                  dispatch(
                    setMainButtonStyleProperty({
                      key: 'fontWeight',
                      value: e.target.value,
                    })
                  )
                }}
              >
                <MenuItem value={400}>400</MenuItem>
                <MenuItem value={600}>600</MenuItem>
              </TextField>
              <ColorPicker
                tooltip="Color"
                label="Color"
                color={styles.main.button.color}
                onChange={(color: any) => {
                  dispatch(
                    setMainButtonStyleProperty({ key: 'color', value: color })
                  )
                }}
                mb={10}
              />
              <ColorPicker
                tooltip="Color"
                label="Color"
                color={styles.main.button.background}
                onChange={(color: any) => {
                  dispatch(
                    setMainButtonStyleProperty({
                      key: 'background',
                      value: color,
                    })
                  )
                }}
                mb={10}
              />
            </AccordionDetails>
          </Accordion>
        </AccordionDetails>
      </Accordion>

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Background
        </AccordionSummary>
        <AccordionDetails>
          <ColorPicker
            tooltip="Background color"
            label="Color"
            color={styles.background.backgroundColor}
            onChange={(color: any) => changeBackgroundColor(color)}
            mb={15}
          />
          <Typography gutterBottom>Background image</Typography>
          <div style={{ display: 'flex' }}>
            <div
              style={{
                width: '100px',
                height: '100px',
                background: 'rgba(0, 0, 0, 0.1)',
                display: 'flex',
              }}
            >
              {styles.background.backgroundImage ? (
                <img
                  src={styles.background.backgroundImage}
                  style={{ width: '100%', height: '100%' }}
                  alt="background"
                />
              ) : (
                <div>No background image</div>
              )}
            </div>

            <div>
              <Tooltip title="Set background image">
                <IconButton
                  onClick={() => setBackgroundDialog(true)}
                  color="info"
                >
                  <ImageIcon />
                </IconButton>
              </Tooltip>
              <Tooltip title="Delete background image">
                <IconButton
                  onClick={() => changeBackgroundImage('')}
                  color="error"
                >
                  <DeleteIcon />
                </IconButton>
              </Tooltip>
            </div>
          </div>
        </AccordionDetails>
      </Accordion>
      <SelectBackgroundDialog
        open={backgroundDialog}
        onClose={() => setBackgroundDialog(false)}
        setBackgroundImage={(file: any) => changeBackgroundImage(file.url)}
      />

      <Accordion disableGutters>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          Questions
        </AccordionSummary>
        <AccordionDetails>
          <ColorPicker
            color={styles.fields.title.color}
            onChange={handleChangeQuestionTextColor}
            mb={10}
            label="Title color"
          />
          <ColorPicker
            color={styles.fields.input.color}
            onChange={handleChangeInputColor}
            mb={10}
            label="Input color"
          />
          <ColorPicker
            color={styles.fields.options.color}
            onChange={(color: any) =>
              dispatch(
                setQuestionOptionProperty({ key: 'color', value: color })
              )
            }
            mb={10}
            label="Option title"
          />
          <ColorPicker
            color={styles.fields.options.background}
            onChange={(color: any) =>
              dispatch(
                setQuestionOptionProperty({ key: 'background', value: color })
              )
            }
            mb={10}
            label="Option background"
          />
          <ColorPicker
            color={styles.fields.options.selectedBackground}
            onChange={(color: any) =>
              dispatch(
                setQuestionOptionProperty({
                  key: 'selectedBackground',
                  value: color,
                })
              )
            }
            mb={10}
            label="Option selected outline"
          />
        </AccordionDetails>
      </Accordion>
    </Box>
  )
}

export default FormStyles
