/// <reference path="c:\Users\LeXX\.vscode\extensions\mkyaulakis.vscode-ext-wt-helper-0.0.16/wt.d.ts"/>
<%
var action = Request.Form.GetOptProperty("action", null);
var code = Request.Form.GetOptProperty("code", null);
var id = Request.Form.GetOptProperty("id", null);
var data = Request.Form.GetOptProperty("data", []);
var encodedData = Request.Form.GetOptProperty("encodeddata", null);
var name = Request.Form.GetOptProperty("name", null);
var type = Request.Form.GetOptProperty("type", null);
var role_id = Request.Form.GetOptProperty("role", null);
var text = Request.Form.GetOptProperty("text", null);


var client_api = Request.Header.GetOptProperty("wt-ext-api-key", null);

var s_key = "W#hQGVzkl$LI6?YW"
var version = 0.4

EnableLogExt("vscode-ext-wt-helper", "");
/**
 *
 * @param {string} sMsg
 * @return {void}
 */
function Log(sMsg) {
  LogEvent("vscode-ext-wt-helper", sMsg);
}

RESULT = {};
RESULT.data = null;
RESULT.meta = {};
RESULT.error = 0;
RESULT.message = "";
RESULT.act = action

var accessDocTypes = ["custom_web_template", "server_agent", "remote_collection", "remote_action"];



function updateDoc() {
  var updDoc = tools.open_doc(id);
  if (updDoc == undefined) {
    RESULT.message = "Документ " + id + " не найден";
    RESULT.error = 1;
    return;
  }
  if (encodedData == null) {
    RESULT.message = "Проблема c  переданными данными";
    RESULT.error = 1;
  }
  var updDocTe = updDoc.TopElem;
  switch (updDocTe.Name) {
    case "custom_web_template":
      if (updDocTe.url.HasValue) {
        updateFs(
          UrlAppendPath(global_settings.web_path, updDocTe.url),
          encodedData
        );
        RESULT.message =
          "Обновлен файл " +
          UrlAppendPath(global_settings.web_path, updDocTe.url);
      } else {
        updDocTe.EvalPath("html").Value = Base64Decode(encodedData);
        updDoc.Save();
        RESULT.message = "файл " + id + " обновлен.";
      }
      break;
    case "server_agent":
      if (updDocTe.run_code_url.HasValue) {
        updateFs(updDocTe.run_code_url, encodedData);
        RESULT.message =
          "Обновлен файл " +
          UrlAppendPath(global_settings.web_path, updDocTe.url);
      } else {
        updDocTe.EvalPath("run_code").Value = Base64Decode(encodedData);
        updDoc.Save();
        RESULT.message = "файл " + id + " обновлен.";
      }
      break;
    case "remote_collection":
    case "remote_action":
      if (updDocTe.url.HasValue) {
        updateFs(updDocTe.url, encodedData);
        RESULT.message =
          "Обновлен файл " +
          UrlAppendPath(global_settings.web_path, updDocTe.script);
      } else {
        updDocTe.EvalPath("script").Value = Base64Decode(encodedData);
        updDoc.Save();
        RESULT.message = "файл " + id + " обновлен.";
      }
      break;
    default:
      RESULT.message = "Документ с типом " + updDoc.Name + " обновить нельзя";
      RESULT.error = 1;
      break;
  }

  return;
}

function getFs() {
  var url = Request.Form.GetOptProperty("url", null);
  if (url != null) {
    try {
      html = Base64Encode(LoadUrlText(url));
      RESULT.data = html;
      RESULT.meta.basicExt = UrlPathSuffix(url);
    } catch (e) {
      RESULT.message = "Ошибка при открытии " + UserError(e);
      RESULT.error = 1;
    }

  } else {
    RESULT.message = "Отсутствует адрес";
    RESULT.error = 1;
  }
}

function updateFs(path, fdata) {
  PutFileData(path, Base64Decode(fdata));
}

 

function getRefs(arr) {
  var refsArr = [];
  for (i in arr) {
    refsArr.push(i.include_custom_web_template_id.Value);
  }
  return refsArr;
}

function getDataFieldAndExt(docTE) {
  _dataObj = {
    basicExt: "xml",
    dataField: "Base64Encode(docTe.Xml)",
    refNode: null,
    file: false
  };

  switch (docTe.Name) {
    case "custom_web_template":
      _dataObj.dataField = docTE.url.HasValue
        ? "Base64Encode(LoadUrlText( UrlAppendPath( global_settings.web_path, docTe.url ) ))"
        : "Base64Encode(docTe.html)";
      _dataObj.basicExt = docTE.cwt_type === "css" ? "css" : "js";
      _dataObj.basicExt = docTE.out_type === "xaml" ? "css" : _dataObj.basicExt;
      _dataObj.refNode =
        "(ArrayCount(docTe.include_custom_web_templates)>0 ? getRefs(docTe.include_custom_web_templates) : [])";
      break;
    case "server_agent":
      _dataObj.dataField = docTe.run_code_url.HasValue
        ? "Base64Encode(LoadUrlText( docTe.run_code_url ) )"
        : "Base64Encode(docTe.run_code)";
      _dataObj.basicExt = "js";

      break;
    case "remote_collection":
    case "remote_action":
      _dataObj.dataField = docTE.url.HasValue
        ? "Base64Encode(LoadUrlText(UrlAppendPath( global_settings.web_path, docTe.url ) ))"
        : "Base64Encode(docTe.script)";
      _dataObj.basicExt = "js";
      break;
    default:
      break;
  }

  return _dataObj;
}
//select top 10 cs.* from server_agents cs

function getDocByID() {
  doc = tools.open_doc(id);
  if (doc === undefined) {
    RESULT.message = "Отсутствует документ с id: " + id;
    RESULT.error = 1;
    return;
  } else {
    docTe = doc.TopElem;

    _dataFieldTypes = getDataFieldAndExt(docTe);
    eval("RESULT.data = " + _dataFieldTypes.dataField);
    RESULT.meta = {
      id: id,
      code: docTe.code.Value,
      name: docTe.name.GetOptChildByKey('name', ''),
      type: docTe.Name,
      ref: [],
      basicExt: _dataFieldTypes.basicExt
    }
    if (_dataFieldTypes.refNode != null) {
      eval("RESULT.meta.ref =  " + _dataFieldTypes.refNode);
    }
  }

  return true;
}

function startAgent() {

  try {
    tools.start_agent(Int(id))
    RESULT.message = "Агент " + id + " запущен";
  } catch (e) {
    RESULT.message = 'Ошибка при запуске агента ' + e;
    RESULT.error = 1;
  }
  return
}

function getTypeDocByID() {
  doc = tools.open_doc(id);
  if (doc === undefined) {
    RESULT.message = "Отсутствует документ с id: " + id;
    RESULT.error = 1;
    return;
  } else {
    type = doc.TopElem.Name;
    accessDocType = false;
    for (t in accessDocTypes) {
      if (type == t) {
        accessDocType = true;
      }
      RESULT.type = type;
      RESULT.accessDocType = accessDocType;
    }
  }
}

function xquery(text) {

  var prefix = text.indexOf('for') === 0 ? '' : "sql: "
  var result = ArraySelectAll(XQuery(prefix + text))
  var rows = []
  var firstRow = ArrayOptFirstElem(result)
  var headers = []
  if (firstRow != undefined) {
    for (h in firstRow) {
      headers.push({
        key: h.Name
      })
    }
  }
  for (r in result) {
    _row = {}
    for (h in headers) {
      _row.SetProperty(h.key, r.GetOptProperty(h.key).Value)
    }
    rows.push(_row)
  }
  return { rows: rows, headers: headers, sql: text }

}


function getObjects(type, role_id, parent_role_id) {

  var xquery = ""
  switch (type) {
    case "custom_web_template":
    case "server_agent":
    case "remote_collection":
    case "remote_action":
      if (role_id) {
        if (role_id.indexOf('empty') != -1) {
          xquery = "for $elem in " + type + "s where  IsEmpty($elem/role_id)=true() return $elem/id, $elem/code, $elem/name"
        } else {
          xquery = "for $elem in " + type + "s where MatchSome($elem/role_id, (" + role_id + ")) return $elem/id, $elem/code, $elem/name"
        }
      } else {
        if (parent_role_id) {
          xquery = "for $elem in roles where $elem/catalog_name = " + XQueryLiteral(type) + "  and  parent_role_id= " + XQueryLiteral(parent_role_id) + " return $elem/id, $elem/code, $elem/name"
        } else {
          xquery = "for $elem in roles where $elem/catalog_name = " + XQueryLiteral(type) + "  and  parent_role_id=null() return $elem/id, $elem/code, $elem/name"

        }
      }
      break;
    default:

      break;
  }

  var objectsArr = ArrayExtract(XQuery(xquery), 'return {id : String(This.id), name : This.name.Value, code : This.code.Value, type : This.Name}')

  if (role_id) {
    objectsArr = ArrayExtract(objectsArr, 'return {id : String(This.id)+\'_\'+role_id, name : This.name, code : This.code, type : This.type}')
    objectsArr = ArrayUnion(getObjects(type, undefined, role_id), objectsArr)
  }

  if (!role_id && !parent_role_id) {
    objectsArr.push({ id: 'empty_' + type, name: 'Без категории', code: '', type: 'role' })
  }

  return objectsArr

}


function getObjectVersions() {

  var versions = XQuery("for $elem in object_versions where $elem/object_id  = " + XQueryLiteral(id) + "  order by   $elem/object_modification_date descending  return $elem/id, $elem/object_modification_date")
  if (ArrayOptFirstElem(versions) != undefined) {
    versions = ArrayExtract(versions, 'return {id : String(This.id), object_modification_date : StrDate(This.object_modification_date.Value)}')
  }
  RESULT.data = versions
}

function getObjectVersion() {

  var objVersionDoc = tools.open_doc(id);
  var fldObjectType = common.exchange_object_types.GetChildByKey(objVersionDoc.TopElem.catalog_name);
  var docTe = OpenDocFromStr(objVersionDoc.TopElem.object_xml, 'form=' + fldObjectType.form_url).TopElem

  _dataFieldTypes = getDataFieldAndExt(docTe);
  eval("RESULT.data = " + _dataFieldTypes.dataField);

  RESULT.meta = {
    id: id,
    code: docTe.code.Value,
    name: docTe.name.Value,
    type: docTe.Name,
    ref: [],
    basicExt: _dataFieldTypes.basicExt
  }
  if (_dataFieldTypes.refNode != null) {
    eval("RESULT.meta.ref =  " + _dataFieldTypes.refNode);
  }
}


function createDoc() {
  accessDocType = false

  for (t in accessDocTypes) {
    if (type == t) {
      accessDocType = true;
    }
  }
  if (accessDocType) {
    _doc = tools.new_doc_by_name(type, false);
    _doc.TopElem.code = code
    _doc.TopElem.name = name
    _doc.BindToDb(DefaultDb);
    _doc.Save();
  }
  Log("Create _doc.DocID " + _doc.DocID + " ")
  id = _doc.DocID
  return getDocByID();
}

try {

  if (s_key != client_api) {
    return
  }

  switch (action) {
    case "eval":
      _eval();
      break;
    case "getDocByID":
      getDocByID();
      break;
    case "getTypeDocByID":
      getTypeDocByID();
      break;
    case "startAgent":
      startAgent();
      break;
    case "getFs":
      getFs();
      break;
    case "updateDoc":
      updateDoc();
      break;
    case "createDoc":
      createDoc();
      break;
    case "getObjects":
      RESULT.data = getObjects(type, role_id);
      break;
    case "xquery":
      RESULT.data = xquery(text);
      break;
    case "getObjectVersions":
      getObjectVersions();
      break;
    case "getObjectVersion":
      getObjectVersion();
      break;
    default:
      Request.SetRespStatus(400, "no action");
      break;
  }
  Response.Write(tools.object_to_text(RESULT, "json"));
} catch (error) {
  Log(error)
  RESULT.error = 1;
  RESULT.message = error;
  Response.Write(tools.object_to_text(RESULT, "json"));
} finally {
  Log(tools.object_to_text(RESULT, "json"))
  Log(tools.object_to_text(Request.Form, "json"));
}
%>