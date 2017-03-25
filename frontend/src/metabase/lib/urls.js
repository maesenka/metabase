// provides functions for building urls to things we care about
import MetabaseSettings from "metabase/lib/settings";

var Urls = {
    card: function(card_id) {
        // NOTE that this is for an ephemeral card link, not an editable card
        return MetabaseSettings.rootPath() + "card/"+card_id;
    },

    dashboard: function(dashboard_id) {
        return MetabaseSettings.rootPath() + "dash/"+dashboard_id;
    },

    modelToUrl: function(model, model_id) {
        switch (model) {
            case "card":      return Urls.card(model_id);
            case "dashboard": return Urls.dashboard(model_id);
            case "pulse":     return Urls.pulse(model_id);
            default:          return null;
        }
    },

    pulse: function(pulse_id) {
        return "/pulse/#"+pulse_id;
    },

    tableRowsQuery: function(database_id, table_id, metric_id, segment_id) {
        let url = MetabaseSettings.rootPath() +  "q#?db="+database_id+"&table="+table_id;

        if (metric_id) {
            url = url + "&metric="+metric_id;
        }

        if (segment_id) {
            url = url + "&segment="+segment_id;
        }

        return url;
    },

    collection(collection) {
        return `${MetabaseSettings.rootPath()}questions/collections/${encodeURIComponent(collection.slug)}`;
    },

    label(label) {
        return `${MetabaseSettings.rootPath()}questions/search?label=${encodeURIComponent(label.slug)}`;
    },

    publicCard(uuid, type = null) {
        return `${MetabaseSettings.rootPath()}public/question/${uuid}` + (type ? `.${type}` : ``);
    },

    publicDashboard(uuid) {
        return `${MetabaseSettings.rootPath()}public/dashboard/${uuid}`;
    },

    embedCard(token, type = null) {
        return `${MetabaseSettings.rootPath()}embed/question/${token}` + (type ? `.${type}` : ``);
    },
}

export default Urls;
