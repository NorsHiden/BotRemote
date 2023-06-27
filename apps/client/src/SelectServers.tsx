import React from 'react'

const AddedServer = () => {
    return (
        <div className='servercomp'>
            <div className='servercomp-pic'></div>
            <div className='servercomp-titleandbuttons'>
            <div className='servercomp-servername'>Server Name</div>
            <div className='servercomp-buttons'>
                <a className='servercomp-control' href="/home/server_name">Control</a>
                <a className='servercomp-remove' href="#">Remove</a>
            </div>
            </div>
        </div>
    )
}

const UnAddedServer = () => {
    return (
        <div className='servercomp'>
            <div className='servercomp-pic'></div>
            <div className='servercomp-titleandbuttons'>
            <div className='servercomp-servername'>Server Name</div>
            <div className='servercomp-buttons'>
                <a className='servercomp-add' href="#">Add</a>
            </div>
            </div>
        </div>
    )
}

const SelectServers = () => {
  return (
    <>
    <div className='headline1'><h1>My Servers</h1></div>
    <div className='arrayservers'>
        <AddedServer />
        <UnAddedServer />
        <AddedServer />
        <AddedServer />
        <UnAddedServer />
        <UnAddedServer />
        <AddedServer />
        <AddedServer />
    </div>
    </>
  )
}

export default SelectServers