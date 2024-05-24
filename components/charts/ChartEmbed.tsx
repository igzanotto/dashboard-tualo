interface VisualizationEmbedProps {
    src: string;
  }
  
  const ChartEmbed: React.FC<VisualizationEmbedProps> = ({ src }) => (
    <div className="visualization-embed">
      <iframe
        src={src}
        title="Visualization"
        className="w-full h-screen border-none max-lg:h-[500px]"
      />
    </div>
  );
  
  export default ChartEmbed;