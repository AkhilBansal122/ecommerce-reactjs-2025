function TextErrorMsg (props) {
    const errorStyle = {
        fontSize: "14px",
        color: "#E55D42",
        marginTop: "3px"
    }
    return <div className='error' style={errorStyle}><i className="fad fa-exclamation-circle me-2"></i>{props.children}</div>
  }
  
  export default TextErrorMsg