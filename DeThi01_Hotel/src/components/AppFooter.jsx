import about from '../data/about'

export default function AppFooter() {
  // TODO-08: Hiển thị logo, copyright, version, course từ about.js
  return (
    <footer className="bg-dark text-white py-3 mt-auto">
      <div className="container text-center">
        {/* TODO-08: Hiển thị logo image, appName, copyright, version, course */}
        <img src={about.logo} alt="logo" width="24" height="24" />
<p>{about.appName}</p>
<p>{about.copyright}</p>
<p>{about.version}</p>
<p>{about.course}</p>
      </div>
    </footer>
  )
}
