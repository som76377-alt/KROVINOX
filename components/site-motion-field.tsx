export default function SiteMotionField() {
  return <>
    <div className="site-atmosphere" aria-hidden="true">
      <div className="atmosphere-orbit atmosphere-orbit--north">
        <span className="atmosphere-orbit-node" />
        <span className="atmosphere-orbit-tick" />
        <span className="atmosphere-orbit-core" />
      </div>
      <div className="atmosphere-orbit atmosphere-orbit--south">
        <span className="atmosphere-orbit-node" />
        <span className="atmosphere-orbit-tick" />
      </div>
      <span className="atmosphere-coordinate atmosphere-coordinate--one">KX / 001</span>
      <span className="atmosphere-coordinate atmosphere-coordinate--two">FORM FOLLOWS FEELING</span>
    </div>
    <div className="site-scroll-progress" aria-hidden="true"><span /></div>
  </>;
}
