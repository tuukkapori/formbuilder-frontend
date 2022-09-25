const getInputStyles = (form: any) => {
  const styles = form?.styles?.fields?.input || {}
  return styles
}

const getInputTitleStyles = (form: any) => {
  const styles = form?.styles?.fields?.title || {}
  return styles
}

const getInputTitleColor = (form: any) => {
  return getInputTitleStyles(form).color || {}
}

const getMainTitleStyles = (form: any) => {
  const styles = form?.styles?.main?.title || {}
  return styles
}

const getMainDescriptionStyles = (form: any) => {
  const styles = form?.styles?.main?.description || {}
  return styles
}

const getTextAreaStyles = (form: any) => {
  const styles = form?.styles?.fields?.textArea || {}
  return styles
}

const getHeaderContainerStyles = (form: any) => {
  const styles = form?.styles?.header?.background || {}
  return styles
}

const getHeaderTitleStyles = (form: any) => {
  const styles = form?.styles?.header?.title || {}
  return styles
}

export {
  getInputStyles,
  getInputTitleStyles,
  getMainTitleStyles,
  getTextAreaStyles,
  getHeaderContainerStyles,
  getHeaderTitleStyles,
  getMainDescriptionStyles,
  getInputTitleColor,
}
