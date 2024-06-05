interface VisualizationEmbedProps {
  src: string;
}

const ChartEmbed: React.FC<VisualizationEmbedProps> = ({ src }) => (
  <div className="visualization-embed">
    <iframe
      src={src}
      title="Visualization"
      className="w-[100%] border-none h-screen max-md:h-[480px]"
    />
  </div>
);

export default ChartEmbed;