const WorkflowNodesVisual = () => (
  <div className="relative h-full w-full flex items-center justify-between px-3">
    {[0, 1, 2, 3].map((i) => (
      <div key={i} className="relative flex items-center">
        <div
          className="w-5 h-5 md:w-6 md:h-6 rounded-md border border-primary/40 bg-primary/10 animate-[pp-node-pulse_2.4s_ease-in-out_infinite]"
          style={{ animationDelay: `${i * 0.3}s` }}
        />
        {i < 3 && (
          <div className="w-6 md:w-8 h-px bg-gradient-to-r from-primary/40 to-primary/10 mx-1" />
        )}
      </div>
    ))}
  </div>
);

export default WorkflowNodesVisual;
