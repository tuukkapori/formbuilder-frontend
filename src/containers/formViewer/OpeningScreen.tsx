import { Button } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'

import React from 'react'

const OpeningScreen = ({ form, isVisible, startForm }: any) => {
  const title = form.openingScreen?.title
  const description = form.openingScreen?.description
  const callToAction = form.openingScreen?.callToAction
  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="opening-screen"
          exit={{ y: -2000 }}
          initial={{ y: -2000 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
          style={{
            position: 'absolute',
            margin: 'auto',
            right: 0,
            left: 0,
            top: 0,
            bottom: 0,
          }}
        >
          <h2>{title}</h2>
          <h4>{description}</h4>
          <Button onClick={startForm} variant="contained">
            {callToAction}
          </Button>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export default OpeningScreen
