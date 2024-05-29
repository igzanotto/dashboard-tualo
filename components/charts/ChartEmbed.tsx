interface VisualizationEmbedProps {
    src: string;
  }
  
  const ChartEmbed: React.FC<VisualizationEmbedProps> = ({ src }) => (
    <div className="visualization-embed">
      <iframe
        src={src}
        title="Visualization"
        className="w-[100%] h-[500px] border-none max-xl:h-screen"
      />
    </div>
  );
  
  export default ChartEmbed;