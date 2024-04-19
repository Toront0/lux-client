interface IVideoDetailDescription {
  description: string;
}

const VideoDetailDescription = ({ description }: IVideoDetailDescription) => {
  return (
    <div className="mt-8  text-sm text-gray-4 p-4 bg-gray-14 dark:bg-gray-2 rounded dark:text-gray-12">
      <pre className=" whitespace-pre-wrap">{description}</pre>
    </div>
  );
};

export default VideoDetailDescription;
