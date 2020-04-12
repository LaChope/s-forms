import JsonLdUtils from "jsonld-utils";

import Constants from "../constants/Constants";
import Utils from "./Utils";

export default class JsonLdObjectMap {

    static objectMap = {};

    static putObject(id, question) {
        JsonLdObjectMap.objectMap[id] = question;
    }

    static getObject(id) {
        return JsonLdObjectMap.objectMap[id];
    }
}
