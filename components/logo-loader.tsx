export function LogoLoader() {
  return (
    <div className="grid min-h-[40vh] place-items-center">
      <div className="flex flex-col items-center gap-3">
        <img src="/placeholder-logo.svg" alt="ASBL logo" className="h-10 w-10 animate-pulse" />
        <div className="h-1 w-40 overflow-hidden rounded bg-muted">
          <div className="h-full w-1/3 animate-[loading_1.4s_ease-in-out_infinite] bg-primary" />
        </div>
      </div>
      <style>{`@keyframes loading{0%{margin-left:0}50%{margin-left:66%}100%{margin-left:0}}`}</style>
    </div>
  )
}
