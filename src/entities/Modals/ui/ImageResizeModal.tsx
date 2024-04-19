import { Button, ModalAnimation, ModalContent } from "@/shared";

import { IoMdClose } from "react-icons/io";

interface IImageResizeModal {
  isOpen: boolean;
  onClose: () => void;
}

const ImageResizeModal = ({ isOpen, onClose }: IImageResizeModal) => {
  // const [value] = useState({ x: 0.2, y: 0.6 });

  return (
    <ModalAnimation isOpen={isOpen} onClose={onClose}>
      <ModalContent isOpen={isOpen} onClose={onClose}>
        <div className="flex items-center justify-between">
          <h4 className="font-semibold text-gray-4 dark:text-gray-12">
            Загрузить изображение
          </h4>
          <Button onClick={onClose}>
            <IoMdClose className="w-full h-full" />
          </Button>
        </div>
      </ModalContent>
    </ModalAnimation>
  );
};

export default ImageResizeModal;
