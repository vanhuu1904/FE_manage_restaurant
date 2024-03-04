import { Divider, Drawer, Upload, Modal } from "antd";
import { Descriptions } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
const FoodViewDetail = (props) => {
  const {
    openViewDetail,
    setOpenViewDetail,
    dataViewDetail,
    setDataViewDetail,
  } = props;
  console.log(">>> check data: ", dataViewDetail);
  const onClose = () => {
    setOpenViewDetail(false);
    setDataViewDetail(null);
  };

  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });

  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);
  useEffect(() => {
    if (dataViewDetail) {
      let img = {};
      if (dataViewDetail.image) {
        img = {
          uid: uuidv4(),
          name: `${dataViewDetail.name}.png`,
          status: "done",
          url: `${dataViewDetail.image}`,
        };
      }
      setFileList([img]);
      setPreviewImage(dataViewDetail.image);
      console.log(">>> check preview image: ", previewImage);
    }
  }, [dataViewDetail]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };

  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };
  return (
    <Drawer
      title="Chức năng xem chi tiết"
      placement="right"
      onClose={onClose}
      open={openViewDetail}
      width={"60vw"}
    >
      <Descriptions title="Thông tin món ăn" bordered column={2}>
        <Descriptions.Item label="Id">{dataViewDetail?.id}</Descriptions.Item>
        <Descriptions.Item label="Món ăn">
          {dataViewDetail?.name}
        </Descriptions.Item>
        <Descriptions.Item label="Giá">
          {dataViewDetail?.price}
        </Descriptions.Item>
        <Descriptions.Item label="Trạng thái">
          {dataViewDetail?.status}
        </Descriptions.Item>
        <Descriptions.Item label="Created At">
          {moment(dataViewDetail?.createdAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
        <Descriptions.Item label="Updated At">
          {moment(dataViewDetail?.updatedAt).format("DD-MM-YYYY HH:mm:ss")}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Ảnh Food</Divider>
      <img
        alt="example"
        style={{ width: "80%", height: "80%" }}
        src={previewImage}
      />
      <Upload
        action="https://run.mocky.io/v3/435e224c-44fb-4773-9faf-380c5e6a2188"
        listType="picture-food"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{ showRemoveIcon: false }}
      ></Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img alt="example" style={{ width: "100%" }} src={previewImage} />
      </Modal>
    </Drawer>
  );
};
export default FoodViewDetail;
