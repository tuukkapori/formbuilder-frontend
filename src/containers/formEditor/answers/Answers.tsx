import React, { useState } from 'react'
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Typography,
  Box,
  Snackbar,
  Alert,
  Tabs,
  Button,
  Tab,
  Dialog,
  DialogTitle,
  DialogContent,
  Popover,
  TextField,
} from '@mui/material'
import { useSelector } from 'react-redux'
import { CSVLink } from 'react-csv'
import { selectAnwersForForm } from '../../../selectors/forms'
import TabPanel from '../../../components/common/TabPanel'
import { getDataForCSV } from '../../../utils/forms'
import { Form } from '../../../types/forms'

interface AnswersProps {
  formId: string
  form: Form
}

const Answers = ({ formId, form }: AnswersProps) => {
  const [notificationOpen, setNotificationOpen] = useState(false)
  const [tab, setTab] = useState(0)
  const [copyColumnValuesAnchor, setCopyColumnValuesAnchor] =
    useState<any>(null)

  const [dialogs, setDialogs] = useState({
    exportValues: false,
    copyEmails: false,
  })

  const setDialogVisibility = (name: string, visible: boolean) => {
    setDialogs((prev) => ({
      ...prev,
      [name]: visible,
    }))
  }
  const answersForThisForm = useSelector(selectAnwersForForm(formId))

  if (!answersForThisForm) {
    return <div>not found</div>
  }
  return (
    <Box sx={{ padding: 3, height: '100%' }}>
      <Tabs value={tab} onChange={(_: any, newVal: number) => setTab(newVal)}>
        <Tab label="All answers" />

        <Tab label="Insights" disabled />
      </Tabs>
      <TabPanel value={tab} index={0}>
        <Box
          sx={{ mt: 2 }}
          style={{
            display: 'flex',
            alignItems: 'end',
            gap: 5,
            paddingBottom: '20px',
          }}
          id="answers-container"
        >
          <Typography variant="h5">Answers:</Typography>
          <Typography variant="h5">{answersForThisForm.length}</Typography>
        </Box>
        <Button sx={{ mb: 2 }} variant="contained">
          <CSVLink
            data={getDataForCSV(form, answersForThisForm, true)}
            filename={`${form.name}.csv`}
            style={{ textDecoration: 'none', color: 'white' }}
          >
            Export CSV
          </CSVLink>
        </Button>
        <TableContainer component={Paper}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell sx={{ width: '50px' }}></TableCell>
                {form.fields.map((field: any, index: number) => (
                  <TableCell key={index} sx={{ fontWeight: 600 }}>
                    {field.title}
                  </TableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {answersForThisForm.map((ans: any, index: number) => {
                return (
                  <TableRow
                    key={index}
                    sx={{ height: '50px', width: '50px', overflow: 'hidden' }}
                  >
                    <TableCell sx={{ width: '50px' }}>
                      <Typography>{index + 1}</Typography>
                    </TableCell>

                    {form.fields
                      .map((field: any) => field.id)
                      .map((id: any, index: any) => {
                        const answer = ans[id] || ''
                        return <TableCell key={index}>{answer}</TableCell>
                      })}
                  </TableRow>
                )
              })}
            </TableBody>
          </Table>
        </TableContainer>
      </TabPanel>

      <Dialog
        open={dialogs['exportValues']}
        onClose={() => setDialogVisibility('exportValues', false)}
      >
        <DialogTitle>Export values</DialogTitle>
        <DialogContent></DialogContent>
      </Dialog>
      <Popover
        anchorEl={copyColumnValuesAnchor}
        open={Boolean(copyColumnValuesAnchor)}
        anchorOrigin={{ horizontal: 'center', vertical: 'bottom' }}
        transformOrigin={{ horizontal: 'center', vertical: 'top' }}
        onClose={() => setCopyColumnValuesAnchor(null)}
      >
        <Box
          sx={{
            p: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography>Copy column values</Typography>
          <Button>Copy all values</Button>
          <Typography>or</Typography>
          <Typography>Copy values from row</Typography>
          <TextField label="Start" variant="standard" />
          <Typography>To row</Typography>
          <TextField label="Start" variant="standard" />
          <Button>Copy</Button>
        </Box>
      </Popover>

      <Snackbar
        autoHideDuration={3000}
        open={notificationOpen}
        onClose={() => setNotificationOpen(false)}
      >
        <Alert severity="success">Emails copied to clipboard</Alert>
      </Snackbar>
    </Box>
  )
}

export default Answers
