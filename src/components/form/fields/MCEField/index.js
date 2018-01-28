import React from "react"
import PropTypes from "prop-types"
import { connect } from "react-redux"
import { Field } from "lib/redux-form"
import TinyMCE from "react-tinymce"
import { System } from "HOC"

import { uploadImg, uploadFile } from "redux/modules/upload/upload"

import styles from "../styles.scss"

const baseConfig = {
  theme: "modern",
  skin: "light",
  plugins: [
    "advlist autolink lists link image charmap print preview hr anchor pagebreak",
    "searchreplace wordcount visualblocks visualchars code fullscreen",
    "insertdatetime media nonbreaking save table contextmenu directionality",
    "template paste textcolor colorpicker textpattern imagetools",
  ],
  toolbar1:
    "insertfile undo redo | styleselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image | print preview | forecolor backcolor",
  fontsize_formats: "8pt 9pt 10pt 11pt 12pt 14pt 16pt 18pt 20pt 26pt 36pt",
  file_browser_callback_types: "image file media",
  file_picker_types: "image file media",
  relative_urls: false,
}

@connect(
  state => ({
    realm: state.organisation.orgInfo.realm,
  }),
  {
    uploadImg,
    uploadFile,
  }
)
@System()
class MCE extends React.Component {
  static defaultProps = {
    config: {},
    onChange: () => {},
    onBlur: () => {},
  }

  constructor(props) {
    super(props)

    this.initialContent = props.content

    this.state = {
      inBrowser: false,
      config: {},
    }
  }

  componentDidMount() {
    const { openSnackBar, uploadFile, uploadImg, realm } = this.props

    this.filePickerCallBack = (cb, value, meta) => {
      const input = document.createElement("input")
      input.setAttribute("type", "file")

      if (meta.filetype === "image") {
        input.setAttribute("accept", "image/*")
      }

      input.onchange = function() {
        const file = this.files[0]
        /* Check file type based on meta */
        if (meta.filetype === "file" || meta.filetype === "media") {
          openSnackBar("Uploading file...")
          uploadFile(file.name, file, realm, "editor_files", true).then(
            response => {
              cb(response.Location, { title: file.name })
              openSnackBar("file uploaded...")
            },
            err => {
              if (err.error && err.error.message) {
                openSnackBar(err.error.message)
              } else {
                openSnackBar(
                  "There was an error uploading this file, please try again"
                )
              }
              cb("")
            }
          )
        } else if (meta.filetype === "image") {
          openSnackBar("Uploading image...")
          uploadImg(file.name, file, realm, "editor_images", true).then(
            response => {
              cb(response.Location, { title: file.name })
              openSnackBar("Image uploaded...")
            },
            err => {
              if (err.error && err.error.message) {
                openSnackBar(err.error.message)
              } else {
                openSnackBar(
                  "There was an error uploading this image, please try again"
                )
              }
              cb("")
            }
          )
        } else {
          openSnackBar(
            "This file type is not currently supported by Oxil. Please contact us."
          )
        }
      }
      input.click()
    }

    const { config, isMinimalEditor } = this.props
    let myConfig = {
      ...config,
      ...this.props,
      file_picker_callback: this.filePickerCallBack,
    }

    if (isMinimalEditor) {
      myConfig = {
        ...config,
        ...this.props,
        theme: "modern",
        skin: "light",
        menubar: false,
        plugins: [
          "advlist autolink lists link image charmap print preview hr anchor pagebreak",
          "searchreplace wordcount visualblocks visualchars code fullscreen",
          "insertdatetime media nonbreaking save table contextmenu directionality",
          "template paste textcolor colorpicker textpattern imagetools",
        ],
        toolbar1:
          "undo redo | styleselect fontsizeselect | bold italic | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | forecolor backcolor",
      }
    }

    this.setState({ inBrowser: true, config: myConfig })
  }

  render() {
    return this.state.inBrowser ? (
      <TinyMCE
        {...this.props}
        content={this.initialContent}
        config={{ ...baseConfig, ...this.state.config }}
      />
    ) : null
  }
}

const renderInput = ({
  input,
  meta: { touched, error, warning },

  style,
  className,
  label,
  config = {},
  onChange = () => {},
  onBlur = () => {},
  ...rest
}) => (
  <div className={`${className} ${styles.container}`} style={style}>
    <div className={`mr-2 ${styles.label}`}>{label}</div>

    <div>
      <MCE
        {...input}
        content={input.value}
        config={{ ...baseConfig, ...config }}
        onChange={event => {
          const value = event.target.getContent()
          input.onChange(value)
          onChange(value)
        }}
        onBlur={event => {
          const value = event.target.getContent()
          input.onBlur(value)
          onBlur(value)
        }}
        {...rest}
      />
    </div>

    <div className={`${styles.error}`}>
      {touched &&
        ((error && <span>{error}</span>) ||
          (warning && <span>{warning}</span>))}
    </div>
  </div>
)

const MCEField = props => <Field {...props} component={renderInput} />

export default MCEField
