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
    </div>
    <div className="site-scroll-progress" aria-hidden="true"><span /></div>
  </>;
}
