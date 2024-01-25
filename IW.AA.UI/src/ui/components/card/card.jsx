export const CustomCard = ({ icon, title, bodyText }) => {
  return (
    <article className="custom-card">
      <div className="p-3 surface-card h-full" style={{ borderRadius: '8px' }}>
        <div
          className="flex align-items-center justify-content-center bg-yellow-200 mb-3"
          style={{
            width: '3.5rem',
            height: '3.5rem',
            borderRadius: '10px'
          }}
        >
          <i className={`pi pi-fw ${icon} text-2xl text-yellow-700`}></i>
        </div>
        <h5 className="mb-2 text-900">{title}</h5>
        <span className="text-600">{bodyText}</span>
      </div>
    </article>
  )
}