const MyButton = ({ text, type, onClick }) => { 
    const buttonType = ['positive', 'negative'].includes(type) ? type : 'default';

    return (
        <button className={["MyButton", `MyButton_${type}`].join(" ")} onClick={onClick}>
            {text}
        </button>
    )
}

MyButton.defaultProps = {
    type: 'defailt',
}

export default MyButton;