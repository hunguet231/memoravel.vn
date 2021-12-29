import React, { memo } from "react";
import PropTypes from "prop-types";
import CKEditor from "ckeditor4-react";

const CKEditorComponent = (props) => {
  const { config, data, onChange, ...otherProps } = props;

  const onChangeData = (e) => {
    let htmlData = e.editor.getData();
    onChange && onChange(htmlData);
  };

  return (
    <CKEditor
      data={data || ""}
      config={config || DEFAULT_CONFIG}
      onChange={onChangeData}
      {...otherProps}
    />
  );
};

CKEditorComponent.propTypes = {
  config: PropTypes.object,
  data: PropTypes.string,
  onChange: PropTypes.func,
};
CKEditorComponent.defaultProps = {};

export default memo(CKEditorComponent);

const DEFAULT_CONFIG = {
  toolbarGroups: [
    { name: "document", groups: ["mode", "document", "doctools"] },
    { name: "clipboard", groups: ["clipboard", "undo"] },
    { name: "editing", groups: ["find", "selection", "spellchecker"] },
    { name: "forms" },
    { name: "basicstyles", groups: ["basicstyles", "cleanup"] },
    {
      name: "paragraph",
      groups: ["list", "indent", "blocks", "align", "bidi"],
    },
    { name: "links" },
    { name: "insert" },
    { name: "styles" },
    { name: "colors" },
    { name: "tools" },
    { name: "others" },
  ],
  format_tags: "p;h1;h2;h3;h4;h5;h6;pre;address;div",
  height: "50vh",
  extraPlugins: "font,colorbutton,embed,autoembed,image,justify",
  colorButton_colors:
    "000,800000,8B4513,2F4F4F,008080,000080,4B0082,696969,B22222,A52A2A,DAA520,006400,40E0D0,0000CD,800080,808080,F00,FF8C00,FFD700,008000,0FF,00F,EE82EE,A9A9A9,FFA07A,FFA500,FFFF00,00FF00,AFEEEE,ADD8E6,DDA0DD,D3D3D3,FFF0F5,FAEBD7,FFFFE0,F0FFF0,F0FFFF,F0F8FF,E6E6FA,FFF",
  colorButton_foreStyle: {
    element: "span",
    styles: { color: "#(color)" },
    overrides: [{ element: "font", attributes: { color: null } }],
  },
  colorButton_backStyle: {
    element: "span",
    styles: { "background-color": "#(color)" },
  },
  embed_provider:
    "//ckeditor.iframe.ly/api/oembed?url={url}&callback={callback}",
  fontSize_defaultLabel: "16px",
  contentsCss: [
    "body {font-size: 16px; line-height: 24px; word-wrap: break-word; font-family: Inter,Roboto,Arial,sans-serif;}",
  ],
  enterMode: 1,
};
