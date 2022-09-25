import React from 'react'
import AIClogo from '../../images/AIC_logo_black.png'
const styles = {
  mainContainer: {
    position: 'absolute' as 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    zIndex: 1,
  },
  background: {
    position: 'absolute' as any,
    zIndex: 2,
    width: '100%',
    height: '100%',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  backgroundFilter: {
    position: 'absolute' as any,
    zIndex: 3,
    width: '100%',
    height: '100%',
  },
  form: {
    position: 'absolute' as any,
    zIndex: 4,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
  },
}

const FormContainer = ({ form, children }: any) => {
  return (
    <div style={styles.mainContainer}>
      <div
        id="background"
        style={{
          backgroundImage: `url("${form.styles.background.backgroundImage}")`,
          ...styles.background,
        }}
      />
      <div
        id="background-filter"
        style={{
          ...styles.backgroundFilter,
          backgroundColor: form.styles.background.backgroundColor,
        }}
      ></div>
      <div id="main-form-container" style={styles.form}>
        <div style={{ position: 'absolute', top: 30, left: 30 }}>
          <img
            src={AIClogo}
            style={{ width: '50px', height: '50px' }}
            alt="logo"
          />
        </div>
        {children}
      </div>
    </div>
  )
}

export default FormContainer
