import { Button, Checkbox, Col, Row, Select, message } from "antd";
import { useEffect, useState } from "react";
import {
  assignRolesToGroup,
  fetchAllRoles,
  fetchGroup,
  fetchRolesByGroup,
} from "../../services/roleService";
import "./GroupRole.scss";
import _ from "lodash";
const GroupRole = () => {
  const [options, setOptions] = useState([]);
  const [assignRolesByGroup, setAssignRolesByGroup] = useState([]);
  const [listRoles, setListRoles] = useState([]);
  const [selectGroup, setSelectGroup] = useState("");
  useEffect(() => {
    getGroups();
    fetchRoles();
  }, []);
  const getGroups = async () => {
    let res = await fetchGroup();
    if (res && res.EC === 0) {
      let data = {};
      data =
        res.DT &&
        res.DT.length > 0 &&
        res.DT.map((item, index) => {
          return {
            value: item.id,
            label: item.name,
          };
        });
      setOptions(data);
    }
  };
  const fetchRoles = async () => {
    let res = await fetchAllRoles();
    if (res && res.EC === 0) {
      setListRoles(res.DT);
    }
  };
  const buildDataToPersist = (groupRoles, allRoles) => {
    let result = [];
    if (allRoles && allRoles.length > 0) {
      allRoles.map((role) => {
        let obj = {};
        obj.url = role.url;
        obj.description = role.description;
        obj.id = role.id;
        obj.isAssign = false;
        if (groupRoles && groupRoles.length > 0) {
          obj.isAssign = groupRoles.some((item) => item.url === obj.url);
        }
        result.push(obj);
      });
    }
    return result;
  };
  const handleChange = async (value) => {
    setSelectGroup(value);
    let data = await fetchRolesByGroup(value);
    console.log(">>>check data: ", data);
    if (data && data.EC === 0) {
      let result = buildDataToPersist(data.DT.Roles, listRoles);
      setAssignRolesByGroup(result);
    }
  };

  const handleSelectRole = (value) => {
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    let foundIndex = _assignRolesByGroup.findIndex(
      (item) => +item.id === +value
    );
    console.log(">>check found: ", foundIndex);
    if (foundIndex > -1) {
      _assignRolesByGroup[foundIndex].isAssign =
        !_assignRolesByGroup[foundIndex].isAssign;
      setAssignRolesByGroup(_assignRolesByGroup);
      console.log(">>assign role: ", assignRolesByGroup);
    }
  };
  const buildDataToSave = () => {
    // data = {groupId: 4, groupRoles: [{}, {}, {}, {}]}
    let result = {};
    const _assignRolesByGroup = _.cloneDeep(assignRolesByGroup);
    result.groupId = +selectGroup;
    let groupRolesFilter = _assignRolesByGroup.filter(
      (item) => item.isAssign === true
    );
    let finalGroupRoles = groupRolesFilter.map((item) => {
      let data = { groupId: +selectGroup, roleId: +item.id };
      return data;
    });
    result.groupRoles = finalGroupRoles;
    return result;
  };
  const handleSave = async () => {
    let data = buildDataToSave();
    console.log(">>>check data truoc khi call api: ", data);
    let res = await assignRolesToGroup(data);
    if (res && res.EC === 0) {
      message.success(res.EM);
    } else {
      message.error(res.EM);
    }
    console.log(">>check data: ", data);
  };

  return (
    <>
      <div className="container">
        <div className="container">
          <h2 style={{ marginBottom: "10px" }}>Group role:</h2>
          <h4>Select Group:</h4>
          <Select
            style={{ width: "50%", marginBottom: "10px" }}
            onChange={handleChange}
            options={options}
            placeholder={"Please select your group"}
          />
          <hr />
          <div>
            <h2>Assign Role:</h2>
            <Checkbox.Group>
              <Row>
                {assignRolesByGroup &&
                  assignRolesByGroup.length > 0 &&
                  assignRolesByGroup.map((item, index) => {
                    return (
                      <Col
                        span={6}
                        key={`item-${item.id}`}
                        style={{ fontSize: "20px" }}
                      >
                        <input
                          style={{
                            width: "20px",
                            height: "20px",
                            marginRight: "10px",
                            marginTop: "20px",
                          }}
                          type="checkbox"
                          value={item.id}
                          checked={item.isAssign}
                          id={`key-${item.id}`}
                          onChange={(e) => handleSelectRole(e.target.value)}
                        />
                        <label htmlFor={`key-${item.id}`}>{item.url}</label>
                      </Col>
                    );
                  })}
              </Row>
            </Checkbox.Group>
            <Col span={24}>
              <Button
                type="primary"
                style={{ marginTop: "20px" }}
                onClick={() => handleSave()}
              >
                Save
              </Button>
            </Col>
          </div>
        </div>
      </div>
    </>
  );
};
export default GroupRole;
