import { Action, EmbedEvent, HostEvent } from "@thoughtspot/visual-embed-sdk";
import {
  LiveboardEmbed,
  useEmbedRef
} from "@thoughtspot/visual-embed-sdk/lib/src/react";
import { Layout, Button, Switch, Select, Typography } from "antd";
import React from "react";
import {
  actionsToDisable,
  actionsToHide,
  customActionNameForShowThisViz,
  disabledReason,
  filterName,
  filterValues,
  LiveboardId,
  visibleVizIds
} from "../../constants";
import { useEventLogger } from "../../utils/utils";
import "./liveboard.css";

const { Header, Footer, Sider, Content } = Layout;
const { Option } = Select;

export const Liveboard = () => {
  const logEvent = useEventLogger();
  const embedRef = useEmbedRef();
  const [hiddenActions, setHiddenActions] = React.useState<Action[]>([]);
  const [fullHeight, setFullHeight] = React.useState(false);
  const onToggleHideActions = (checked: boolean) => {
    if (checked) {
      setHiddenActions([]);
    } else {
      setHiddenActions(actionsToHide);
    }
  };

  const [disabledActions, setDisabledActions] = React.useState<Action[]>([]);
  const onToggleDisabledActions = (checked: boolean) => {
    if (checked) {
      setDisabledActions([]);
    } else {
      setDisabledActions(actionsToDisable);
    }
  };

  const [lbV2, setLbV2] = React.useState<boolean>(true);
  const onToggleLbV2 = (checked: boolean) => {
    if (checked) {
      setLbV2(true);
    } else {
      setLbV2(false);
    }
  };

  const applyFilter = (colName: string, value: string) => {
    console.log(colName, value);
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: colName.toLowerCase(),
        operator: "EQ",
        values: [value]
      }
    ]);
  };

  const onDoubleClick = (event: any) => {
    console.log(event);
    const point = event.data.selectedPoints[0].selectedAttributes[0];
    const colName = point.column.name;
    const value = point.value;
    applyFilter(colName, value);
  };

  const onFilterSelect = (value: string) => {
    applyFilter(filterName, value);
  };

  const resetFilter = () => {
    embedRef.current.trigger(HostEvent.UpdateRuntimeFilters, [
      {
        columnName: filterName,
        operator: "EQ",
        values: []
      }
    ]);
  };

  const onCustomAction = (e) => {
    logEvent(e);
    if (e.id === customActionNameForShowThisViz) {
      embedRef.current.trigger(HostEvent.SetVisibleVizs, [
        "5c77eea9-e0f8-4b1a-9dc1-573f296129a8"
      ]);
      console.log(JSON.parse(e.data));
      console.log("selected current viz");
    }
  };
  const onToggleFullHeight = (checked: boolean) => {
    setFullHeight(checked);
  };

  const selectVizs = () => {
    embedRef.current.trigger(HostEvent.SetVisibleVizs, visibleVizIds);
  };
  const reload = () => {
    embedRef.current.trigger(HostEvent.Reload, {});
  };

  return (
    <Layout>
      <Header>
        Liveboard Embed
        <i> (see events details in the console)</i>
      </Header>

      <Layout>
        <Sider width={200} collapsedWidth={0} collapsible>
          <div className="sider-content">
            <Typography.Text>Filter</Typography.Text>
            <Select
              style={{ width: 140 }}
              placeholder="Select filter"
              onChange={onFilterSelect}
            >
              {filterValues.map((item) => (
                <Option value={item}>{item}</Option>
              ))}
            </Select>

            <Button onClick={resetFilter}>Reset filter</Button>
            <Button onClick={reload}>Reload</Button>
            <Button onClick={selectVizs}>Selected Vizs</Button>
            <Switch
              checkedChildren="Height is Adaptive"
              unCheckedChildren="Height is static"
              onChange={onToggleFullHeight}
            />
            <Switch
              checkedChildren="Actions shown"
              unCheckedChildren="Actions hidden"
              defaultChecked
              onChange={onToggleHideActions}
            />
            <Switch
              checkedChildren="Actions enabled"
              unCheckedChildren="Actions disabled"
              defaultChecked
              onChange={onToggleDisabledActions}
            />
            <Switch
              checkedChildren="LiveboardV2 enabled"
              unCheckedChildren="LiveboardV2 disabled"
              defaultChecked
              onChange={onToggleLbV2}
            />
          </div>
        </Sider>

        <Content style={{ overflow: "scroll", height: "720px" }}>
          {/* ThoughtSpot liveboard Embed */}
          <LiveboardEmbed
            frameParams={{
              height: 1200
            }}
            className="liveboard-content"
            ref={embedRef}
            hiddenActions={hiddenActions}
            disabledActions={disabledActions}
            disabledActionReason={disabledReason}
            fullHeight={fullHeight}
            liveboardId={LiveboardId}
            liveboardV2={lbV2}
            onInit={logEvent(EmbedEvent.Init)}
            onLoad={logEvent("Load")}
            onLiveboardRendered={logEvent}
            onDrilldown={logEvent}
            onCustomAction={onCustomAction}
            onVizPointDoubleClick={onDoubleClick}
          />
        </Content>
      </Layout>
      <Footer>Footer</Footer>
    </Layout>
  );
};
