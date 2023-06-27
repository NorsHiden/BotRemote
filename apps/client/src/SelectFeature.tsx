import "./SelectFeature.css"

const SelectFeature = () => {
  return (
    <>
    <div className='headline1'><h1>My Features</h1></div>
    <div className='features'>
      <a className="features-comp features-music" href="/home/server_name/music_section"><div className="center-text">Music</div></a>
      <a className="features-comp features-ai" href="#"><div className="center-text">Ai</div></a>
    </div>
    </>
  )
}

export default SelectFeature