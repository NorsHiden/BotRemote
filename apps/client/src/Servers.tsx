import SelectFeature from './SelectFeature'
import SelectServers from './SelectServers'
import MusicSection from './MusicSection'
import './Servers.css'
import { Routes, Route } from "react-router-dom"

const Navbar = () => {
    return (
        <div className='navbar1'>
            <a className='logo' href="#">Bot<span className='highlight'>Remote</span></a>
            <div className='logout-layout'>
                <div></div>
                <div><a className='logout-button'href="#">Logout</a></div>
            </div>
        </div>
    )
}

const Servers = () => {
    return (
    <>
    <div className='circle-bottom-right'></div>
    <div className='grid-layout'>
        <Navbar />
        <div className='breadcrumb'>Home</div>
        <div className='content-layout'>
            <Routes path="/home">
                <Route index element={<SelectServers />} />
                <Route path="server_name" element={<SelectFeature />} />
                <Route path="server_name/music_section" element={<MusicSection />} />
            </Routes>
        </div>
    </div>
    </>
    )
}

export default Servers