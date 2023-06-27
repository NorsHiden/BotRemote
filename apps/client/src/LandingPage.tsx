import './App.css'

const LandingPage = () => {
    return (
    <div>
        <div className="circle-top-right"></div>
        <div className="circle-bottom-left"></div>
        <div className="navbar"></div>
        <div className="focus-mid">
            <h1 className="header">Revolutionizing <span className="highlight">Discord</span><br />Bot Management</h1>
            <p className="subheader">Bid Farewell to Command Lines and Control Your Bot Directly from Here!</p>
            <a className="login-button" href="/home">Login</a>
        </div>
    </div>
    )
}

export default LandingPage
