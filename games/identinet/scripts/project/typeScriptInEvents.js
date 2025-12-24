import * as API from "./index.js";
// config
export const configureApi = API.configureApi;
export const setAuthToken = API.setAuthToken;
export const clearAuthToken = API.clearAuthToken;
export const getAuthToken = API.getAuthToken;
export const isAuthenticated = API.isAuthenticated;
export const initializeAuth = API.initializeAuth;
export const addAuthStateListener = API.addAuthStateListener;
// auth
export const authenticateNewgrounds = API.authenticateNewgrounds;
export const getItchOAuthUrl = API.getItchOAuthUrl;
export const getGoogleOAuthUrl = API.getGoogleOAuthUrl;
export const verifySession = API.verifySession;
export const getCurrentUser = API.getCurrentUser;
export const logout = API.logout;
export const isLoggedIn = API.isLoggedIn;
export const handleOAuthPopup = API.handleOAuthPopup;
export const loginWithItch = API.loginWithItch;
export const loginWithGoogle = API.loginWithGoogle;
// characters
export const getUserCharacter = API.getUserCharacter;
export const uploadCharacter = API.uploadCharacter;
export const updateUserCharacter = API.updateUserCharacter;
export const getPlazaCharacters = API.getPlazaCharacters;
export const getCharacterById = API.getCharacterById;
export const hasCharacter = API.hasCharacter;
export const canEditCharacter = API.canEditCharacter;
export const getCharactersByCountry = API.getCharactersByCountry;
export const getRandomCharacters = API.getRandomCharacters;
export const getOnlineCharacterPage = API.getOnlineCharacterPage;
export const validateCharacterData = API.validateCharacterData;
export const validateInputName = API.validateInputName;
export const displayServerError = API.displayServerError;
// admin
export const listAllCharacters = API.listAllCharacters;
export const getCharacterDetails = API.getCharacterDetails;
export const deleteCharacter = API.deleteCharacter;
export const listAllUsers = API.listAllUsers;
export const getRecentCharacters = API.getRecentCharacters;
export const getDeletedCharacters = API.getDeletedCharacters;
export const getAdminStats = API.getAdminStats;
export const validateAdminAccess = API.validateAdminAccess;
// constants
export const CHARACTER_NAME_MAX_LENGTH = API.CHARACTER_NAME_MAX_LENGTH;
export const CHARACTER_NAME_REGEX = API.CHARACTER_NAME_REGEX;
export const CHARACTER_NAME_ERROR_MESSAGE = API.CHARACTER_NAME_ERROR_MESSAGE;
export const countries = API.COUNTRIES;
export const months = API.MONTHS;
export const sexes = API.SEXES;
export const races = API.RACES;
export const ethnicities = API.ETHNICITIES;
export const eye_colors = API.EYE_COLORS;
export const hair_colors = API.HAIR_COLORS;
// value arrays
export const SEX_VALUES = API.SEX_VALUES;
export const RACE_VALUES = API.RACE_VALUES;
export const ETHNICITY_VALUES = API.ETHNICITY_VALUES;
export const EYE_COLOR_VALUES = API.EYE_COLOR_VALUES;
export const HAIR_COLOR_VALUES = API.HAIR_COLOR_VALUES;
// utils
export const isValidCountry = API.isValidCountry;
export const validateCharacterName = API.validateCharacterName;
export const getJSONValue = API.getJSONValue;
export const setJSONValue = API.setJSONValue;
export const deleteJSONValue = API.deleteJSONValue;
export const buildDateFromComponents = API.buildDateFromComponents;
export const formatDateForDisplay = API.formatDateForDisplay;
export const mapDropdownValueToKey = API.mapDropdownValueToKey;
export const shouldDeleteField = API.shouldDeleteField;
export const handleRaceMutualExclusivity = API.handleRaceMutualExclusivity;
export const sanitizeCharacterName = API.sanitizeCharacterName;
// main object
export const IdentikitAPI = API.IdentikitAPI;
const scriptsInEvents = {
    async Plaza_Event19_Act1(runtime, localVars) {
        const offset = runtime.globalVars.MENU_offset;
        const max = runtime.globalVars.PLAZA_maxPerPage;
        const state = localVars.state;
        const text_object = runtime.objects.Text.getFirstPickedInstance();
        if (!text_object)
            return;
        text_object.isVisible = false;
        let total = 0;
        function loopCharacters(start, end, getChar) {
            for (let i = start; i <= end; i++) {
                const r = getChar(i);
                if (!r)
                    return;
                runtime.callFunction("addCharacterToList", i - start, i, r.data, r.type);
            }
        }
        if (state === "online") {
            // Online
            runtime.globalVars.MENU_locked = true;
            const online_data = await getOnlineCharacterPage(offset * max, max);
            runtime.globalVars.MENU_locked = false;
            if (!online_data.success) {
                runtime.callFunction("error", "Could not get online people directory. The server may be down, or you may be sending too many requests.");
                text_object.isVisible = true; // Nobody here
                return;
            }
            total = online_data.data.total;
            const pageStart = offset * max;
            const start = pageStart;
            const end = Math.min(pageStart + max - 1, total - 1);
            if (total > 0) {
                if (end < start && offset > 0) {
                    runtime.globalVars.MENU_offset = Math.ceil(total / max) - 1;
                    runtime.callFunction("updateCharacterList", runtime.globalVars.PLAZA_state);
                    return;
                }
            }
            else {
                text_object.isVisible = true; // Nobody here
            }
            // Return if we're no longer processing this list
            if (offset !== runtime.globalVars.MENU_offset || state !== runtime.globalVars.PLAZA_state)
                return;
            loopCharacters(start, end, i => ({
                data: JSON.stringify(online_data.data.characters[i - start]),
                type: "online"
            }));
        }
        else {
            // Local
            const hasUpload = runtime.globalVars.SERVER_hasUploadedCharacter;
            const reserved = 1 + (hasUpload ? 1 : 0);
            const local_data = runtime.objects.SavedCharacters.getFirstInstance();
            const local_data_sorted = runtime.objects.SortedCharacters.getFirstInstance();
            if (!local_data || !local_data_sorted)
                return;
            total = local_data.width + reserved;
            const pageStart = offset * max;
            const start = pageStart - reserved;
            const end = Math.min(pageStart + max - 1, total - 1) - reserved;
            if (total > 0 && end < start && offset > 0) {
                runtime.globalVars.MENU_offset = Math.ceil(total / max) - 1;
                runtime.callFunction("updateCharacterList", runtime.globalVars.PLAZA_state);
                return;
            }
            loopCharacters(start, end, i => {
                if (i < 0) {
                    if (i === -1 && hasUpload) {
                        return {
                            data: runtime.globalVars.SERVER_uploadedCharacterData,
                            type: "local"
                        };
                    }
                    return { data: "", type: "create" };
                }
                let index = local_data_sorted.getAt(i, 0);
                return { data: local_data.getAt(index, 0), type: "local" };
            });
        }
        runtime.callFunction("updatePlazaArrows", total);
    },
    async Plaza_Event60_Act1(runtime, localVars) {
        const data = runtime.globalVars.GAME_selectedCharacterData;
        const { id = "" } = JSON.parse(data);
        const reason = prompt("Please enter a deletion reason.");
        if (reason === null)
            return;
        deleteCharacter(id, reason);
    },
    async Global_Event66_Act12(runtime, localVars) {
        const head_object = runtime.objects.CharacterHead.getFirstPickedInstance();
        if (!head_object)
            return;
        const data = JSON.parse(localVars.data);
        var staticCount = Object.keys(data.character_data.static).length;
        if ("head" in data.character_data.static)
            staticCount -= 1;
        var movableCount = Object.keys(data.character_data.placeable_movable).length;
        if ("eyes" in data.character_data.placeable_movable)
            movableCount += 1;
        if ("eyebrows" in data.character_data.placeable_movable)
            movableCount += 1;
        head_object.instVars.total = (staticCount + movableCount);
    },
    async Global_Event78_Act1(runtime, localVars) {
        const text_object = runtime.objects.Text.getFirstPickedInstance();
        if (!text_object)
            return;
        const text_type = text_object.instVars.type;
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        const getCardText = () => {
            switch (text_type) {
                case "cardName":
                    return sanitizeCharacterName(getJSONValue(json_object, "character_data.info.name"));
                case "cardBirth":
                    return formatDateForDisplay(getJSONValue(json_object, "character_data.info.date_of_birth"));
                case "cardSex":
                    // sex abbreviation
                    const sex = getJSONValue(json_object, "character_data.info.sex");
                    return sexes[sex]?.abbr ?? "";
                case "cardHair":
                    // hair color abbreviation
                    const hairColor = getJSONValue(json_object, "character_data.info.hair_color");
                    return hair_colors[hairColor]?.abbr ?? "";
                case "cardEyes":
                    // eye color abbreviation
                    const eyeColor = getJSONValue(json_object, "character_data.info.eye_color");
                    return eye_colors[eyeColor]?.abbr ?? "";
                case "cardHeight":
                    // height calculation
                    const inches = Number(getJSONValue(json_object, "character_data.info.height_in"));
                    const feet = Math.floor(inches / 12);
                    const remainder = String(inches % 12).padStart(2, "0");
                    ;
                    return `${feet}'-${remainder}"`;
                case "cardWeight":
                    return (getJSONValue(json_object, "character_data.info.weight_lb") + " lb");
                case "cardEthnicity":
                    // ethnicity abbreviation
                    const ethnicity = getJSONValue(json_object, "character_data.info.ethnicity");
                    return ethnicities[ethnicity]?.abbr ?? "";
                case "cardRace":
                    // race abbreviation
                    const raceData = json_object.getJsonDataCopy().character_data
                        .info.race;
                    if (Array.isArray(raceData)) {
                        const raceAbbrs = raceData
                            .map((r) => races[r]?.abbr)
                            .filter(Boolean);
                        return raceAbbrs.join("/");
                    }
                    else {
                        return races[raceData]?.abbr ?? "";
                    }
                case "cardCountry":
                    return getJSONValue(json_object, "character_data.info.location");
                default:
                    return "";
            }
        };
        text_object.text = getCardText();
    },
    async Creator_Event38_Act1(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        const previousHairColor = json_object.getJsonDataCopy().character_data?.info?.hair_color;
        if (previousHairColor === "bald") {
            setJSONValue(json_object, "character_data.info.hair_color", "black");
        }
    },
    async Creator_Event112_Act1(runtime, localVars) {
        const text_object = runtime.objects.InputName.getFirstPickedInstance();
        const json_object = runtime.objects.JSON.getFirstInstance();
        // Make all text inputs auto-sanitize
        if (text_object) {
            const text_element = text_object.getElement();
            text_element.addEventListener("input", function () {
                text_element.value = validateInputName(text_object);
                setJSONValue(json_object, "character_data.info.name", text_element.value.trim());
            });
            text_element.addEventListener("blur", function () {
                text_element.value = text_element.value.trim();
            });
        }
    },
    async Creator_Event115_Act3(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        const extractLabels = (obj) => {
            return Object.fromEntries(Object.entries(obj).map(([k, v]) => [k, v.label]));
        };
        const getDataForType = (listType, index) => {
            switch (listType) {
                case "month":
                    return months;
                case "day":
                    if (!index)
                        return [];
                    const [year, month] = index.split("-").map(Number);
                    const daysInMonth = new Date(year, month, 0).getDate();
                    return Array.from({ length: daysInMonth }, (_, i) => String(i + 1).padStart(2, "0"));
                case "year":
                    const currentYear = new Date().getFullYear();
                    return Array.from({ length: currentYear - 13 - 1900 + 1 }, (_, i) => String(currentYear - 13 - i));
                case "sex":
                    return extractLabels(sexes);
                case "location":
                    return countries;
                case "race#1":
                case "race#2":
                    // Races are mutually exclusive
                    return getFilteredRaces(listType);
                case "ethnicity":
                    return extractLabels(ethnicities);
                case "eye_color":
                    return extractLabels(eye_colors);
                case "hair_color":
                    return getFilteredHairColors();
                default:
                    return [];
            }
        };
        const getFilteredRaces = (listType) => {
            const filteredRaces = extractLabels(races);
            if (listType === "race#1") {
                delete filteredRaces["none"];
                delete filteredRaces[getJSONValue(json_object, "character_data.info.race.1")];
            }
            else {
                delete filteredRaces[getJSONValue(json_object, "character_data.info.race.0")];
            }
            return filteredRaces;
        };
        const getFilteredHairColors = () => {
            const currentHairAssetId = getJSONValue(json_object, "character_data.static.hair.asset_id");
            const currentHairColor = getJSONValue(json_object, "character_data.info.hair_color");
            const isBald = Number(currentHairAssetId) === 0;
            if (isBald) {
                return { bald: hair_colors.bald.label };
            }
            else {
                const filteredHairColors = extractLabels(hair_colors);
                delete filteredHairColors["bald"];
                return filteredHairColors;
            }
        };
        const getSelectedIndex = (listType, rawIndex) => {
            switch (listType) {
                case "month":
                    return months[new Date(rawIndex).getUTCMonth()];
                case "day":
                    return new Date(rawIndex).getUTCDate().toString().padStart(2, "0");
                case "year":
                    return new Date(rawIndex).getUTCFullYear().toString();
                default:
                    return rawIndex;
            }
        };
        const list_object = runtime.objects.InputDropdown.getFirstPickedInstance();
        const list_type = localVars.type;
        const data = getDataForType(list_type, localVars.index);
        const keys = Array.isArray(data) ? data : Object.keys(data);
        const values = Array.isArray(data) ? data : Object.values(data);
        if (list_object) {
            // Add all items to the list
            for (const item of values) {
                list_object.addItem(item);
            }
            // Set selected item
            const selectedValue = getSelectedIndex(list_type.replace(/#.*/, ""), localVars.index);
            const selectedIndex = keys.indexOf(selectedValue);
            if (selectedIndex !== -1) {
                list_object.selectedIndex = selectedIndex;
            }
        }
    },
    async Creator_Event116_Act1(runtime, localVars) {
        const list_object = runtime.objects.InputDropdown.getFirstPickedInstance();
        if (!list_object)
            return;
        const list_type = list_object.instVars.type;
        const selected = list_object.getSelectedTextAt(0);
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        // Get the appropriate key path based on list type
        const getJsonKey = () => {
            switch (list_type) {
                case "month":
                case "day":
                case "year":
                    return "character_data.info.date_of_birth";
                case "race#1":
                    return "character_data.info.race.0";
                case "race#2":
                    return "character_data.info.race.1";
                default:
                    return `character_data.info.${list_type}`;
            }
        };
        const getValue = () => {
            if (["month", "day", "year"].includes(list_type)) {
                const current_dob = getJSONValue(json_object, "character_data.info.date_of_birth");
                return buildDateFromComponents(list_type, selected, current_dob);
            }
            return mapDropdownValueToKey(list_type, selected);
        };
        const refreshRelatedDropdowns = () => {
            if (["month", "year"].includes(list_type)) {
                runtime.callFunction("updateDropdown", "day", "character_data.info.date_of_birth");
            }
            else if (["race#1", "race#2"].includes(list_type)) {
                runtime.callFunction("updateDropdown", "race#1", "character_data.info.race.0");
                runtime.callFunction("updateDropdown", "race#2", "character_data.info.race.1");
            }
        };
        const key = getJsonKey();
        const value = getValue();
        if (list_type === "hair_color") {
            const currentHairAssetId = getJSONValue(json_object, "character_data.static.hair.asset_id");
            const currentHairColor = getJSONValue(json_object, "character_data.info.hair_color");
            const wasBald = Number(currentHairAssetId) === 0;
            const willBeBald = value === "bald";
            if (wasBald && !willBeBald && value !== "bald") {
                setJSONValue(json_object, key, "black");
                runtime.callFunction("updateDropdown", "hair_color", "character_data.info.hair_color");
                return;
            }
        }
        if (list_type.startsWith("race")) {
            handleRaceMutualExclusivity(json_object, list_type, value);
        }
        if (shouldDeleteField(value, list_type)) {
            deleteJSONValue(json_object, key);
        }
        else {
            setJSONValue(json_object, key, value);
        }
        refreshRelatedDropdowns();
    },
    async Creator_Event139_Act1(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        const errors = validateCharacterData(json_object.getJsonDataCopy().character_data).errors;
        if (errors.length > 0) {
            // Reject with errors
            runtime.callFunction("error", errors.join("\n"));
        }
        else {
            runtime.signal("saveCharacter");
        }
    },
    async Creator_Event141_Act1(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        const errors = validateCharacterData(json_object.getJsonDataCopy().character_data).errors;
        if (errors.length > 0) {
            // Reject with errors
            runtime.callFunction("error", errors.join("\n"));
        }
        else {
            runtime.signal("showDisclaimer");
        }
    },
    async Creator_Event144_Act2(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        uploadCharacter(json_object.getJsonDataCopy().character_data);
    },
    async Creator_Event145_Act1(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        const errors = validateCharacterData(json_object.getJsonDataCopy().character_data).errors;
        if (errors.length > 0) {
            // Reject with errors
            runtime.callFunction("error", errors.join("\n"));
        }
        else {
            runtime.signal("updateCharacter");
        }
    },
    async Creator_Event148_Act2(runtime, localVars) {
        const json_object = runtime.objects.JSON.getFirstInstance();
        if (!json_object)
            return;
        updateUserCharacter(json_object.getJsonDataCopy().character_data);
    },
    async Server_Event4_Act3(runtime, localVars) {
        runtime.globalVars.SERVER_isAdmin = await validateAdminAccess();
    },
    async Server_Event9_Act1(runtime, localVars) {
        runtime.globalVars.SERVER_uploadedCharacterData = "waiting";
        getUserCharacter().then(result => {
            if (result.data) {
                runtime.callFunction("setUploadedCharacter", JSON.stringify(result.data), result.data.id, +result.data.can_edit);
            }
            else {
                runtime.callFunction("setUploadedCharacter", "", "", "");
            }
        });
    },
    async Server_Event28_Act1(runtime, localVars) {
        logout();
    },
    async Server_Event34_Act2(runtime, localVars) {
        loginWithGoogle();
    },
    async Server_Event35_Act2(runtime, localVars) {
        loginWithItch();
    },
    async Server_Event39_Act2(runtime, localVars) {
        const session_id = runtime.globalVars.NGIO_sessionID;
        authenticateNewgrounds(session_id);
    },
    async Plaza_Event62_Act2(runtime, localVars) {
        const data = JSON.parse(runtime.globalVars.GAME_selectedCharacterData);
        const name = data.character_data.info.name;
        const censored = sanitizeCharacterName(name);
        if (name !== censored) {
            // Redact the name if it's censored
            data.character_data.info.name = "REDACTED";
            runtime.globalVars.GAME_selectedCharacterData = JSON.stringify(data);
        }
    }
};
globalThis.C3.TypeScriptInEvents = scriptsInEvents;
