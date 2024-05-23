interface VisualizationEmbedProps {
    src: string;
  }
  
  const ChartEmbed: React.FC<VisualizationEmbedProps> = ({ src }) => (
    <div className="visualization-embed">
      <iframe
        src={src}
        title="Visualization"
        style={{ width: '100%', height: '500px', border: 'none' }}
      />
    </div>
  );
  
  export default ChartEmbed;