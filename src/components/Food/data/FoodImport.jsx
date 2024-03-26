import React, { useState } from "react";
import { InboxOutlined } from "@ant-design/icons";
import { message, Modal, Table, Upload } from "antd";
import * as XLSX from "xlsx";
const { Dragger } = Upload;
import templateFile from "./templateFile.xlsx?url";
import { createAllFoods } from "../../../services/foodService";
const FoodImport = (props) => {
  const { openModalImport, setOpenModalImport } = props;
  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const [dataExcel, setDataExcel] = useState([]);
  const propsUpload = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv,application/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
      }
      if (status === "done") {
        if (info.fileList && info.fileList.length > 0) {
          const file = info.fileList[0].originFileObj;
          const reader = new FileReader();
          reader.readAsArrayBuffer(file);
          reader.onload = function (e) {
            const data = new Uint8Array(reader.result);
            const workbook = XLSX.read(data, { type: "array" });
            const sheet = workbook.Sheets[workbook.SheetNames[0]];
            const json = XLSX.utils.sheet_to_json(sheet, {
              header: ["name", "price", "status", "sold", "image"],
              range: 1,
            });
            if (json && json.length > 0) {
              setDataExcel(json);
            }
          };
        }
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  const handleSubmit = async () => {
    let res = await createAllFoods(dataExcel);
    if (res && res.EC === 0) {
      message.success("Thêm mới đồ ăn thành công!");
      setOpenModalImport(false);
      props.fetchFoods();
    } else {
      message.error("lỗi");
    }
  };
  return (
    <>
      <Modal
        title="Import data user"
        width={"50vw"}
        open={openModalImport}
        onOk={() => handleSubmit()}
        onCancel={() => {
          setOpenModalImport(false);
          setDataExcel([]);
        }}
        okText="Import data"
        okButtonProps={{ disabled: dataExcel.length < 1 }}
        maskClosable={false}
      >
        <Dragger {...propsUpload}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">
            Click or drag file to this area to upload
          </p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from
            uploading company data or other banned files. &nbsp;{" "}
            <a
              href={templateFile}
              onClick={(e) => e.stopPropagation()}
              download
            >
              Download Sample File
            </a>
          </p>
        </Dragger>
        <div>
          <Table
            dataSource={dataExcel}
            title={() => <span>Dữ liệu upload: </span>}
            columns={[
              { dataIndex: "name", title: "Tên món ăn" },
              { dataIndex: "status", title: "Trạng thái" },
              { dataIndex: "price", title: "Giá" },
              { dataIndex: "sold", title: "Số lượng đã bán" },
              { dataIndex: "image", title: "Ảnh" },
            ]}
          />
        </div>
      </Modal>
    </>
  );
};

export default FoodImport;
