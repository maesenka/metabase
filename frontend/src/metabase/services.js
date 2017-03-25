/* @flow */

import { GET, PUT, POST, DELETE } from "metabase/lib/api";

import { IS_EMBED_PREVIEW } from "metabase/lib/embed";

// use different endpoints for embed previews
const embedBase = IS_EMBED_PREVIEW ? "/metabase/api/preview_embed" : "/api/embed";

// $FlowFixMe: Flow doesn't understand webpack loader syntax
import getGAMetadata from "promise-loader?global!metabase/lib/ga-metadata"; // eslint-disable-line import/default
import MetabaseSettings from "metabase/lib/settings"


const root = MetabaseSettings.rootPath();
console.log("Root context path set to ", root);

export const ActivityApi = {
    list:                        GET(root + "api/activity"),
    recent_views:                GET(root + "api/activity/recent_views"),
};

export const CardApi = {

    list:                        GET(root + "api/card", (cards, { data }) =>
                                    // HACK: support for the "q" query param until backend implements it
                                    cards.filter(card => !data.q || card.name.toLowerCase().indexOf(data.q.toLowerCase()) >= 0)
                                 ),
    create:                     POST(root + "api/card"),
    get:                         GET(root + "api/card/:cardId"),
    update:                      PUT(root + "api/card/:id"),
    delete:                   DELETE(root + "api/card/:cardId"),
    query:                      POST(root + "api/card/:cardId/query"),
    // isfavorite:                  GET(root + "api/card/:cardId/favorite"),
    favorite:                   POST(root + "api/card/:cardId/favorite"),
    unfavorite:               DELETE(root + "api/card/:cardId/favorite"),
    updateLabels:               POST(root + "api/card/:cardId/labels"),

    listPublic:                  GET(root + "api/card/public"),
    listEmbeddable:              GET(root + "api/card/embeddable"),
    createPublicLink:           POST(root + "api/card/:id/public_link"),
    deletePublicLink:         DELETE(root + "api/card/:id/public_link"),
};

export const DashboardApi = {
    list:                        GET(root + "api/dashboard"),
    create:                     POST(root + "api/dashboard"),
    get:                         GET(root + "api/dashboard/:dashId"),
    update:                      PUT(root + "api/dashboard/:id"),
    delete:                   DELETE(root + "api/dashboard/:dashId"),
    addcard:                    POST(root + "api/dashboard/:dashId/cards"),
    removecard:               DELETE(root + "api/dashboard/:dashId/cards"),
    reposition_cards:            PUT(root + "api/dashboard/:dashId/cards"),

    listPublic:                  GET(root + "api/dashboard/public"),
    listEmbeddable:              GET(root + "api/dashboard/embeddable"),
    createPublicLink:           POST(root + "api/dashboard/:id/public_link"),
    deletePublicLink:         DELETE(root + "api/dashboard/:id/public_link"),
};

export const CollectionsApi = {
    list:                        GET(root + "api/collection"),
    create:                     POST(root + "api/collection"),
    get:                         GET(root + "api/collection/:id"),
    update:                      PUT(root + "api/collection/:id"),
    delete:                   DELETE(root + "api/collection/:id"),
    graph:                       GET(root + "api/collection/graph"),
    updateGraph:                 PUT(root + "api/collection/graph"),
};

export const PublicApi = {
    card:                        GET(root + "api/public/card/:uuid"),
    cardQuery:                   GET(root + "api/public/card/:uuid/query"),
    dashboard:                   GET(root + "api/public/dashboard/:uuid"),
    dashboardCardQuery:          GET(root + "api/public/dashboard/:uuid/card/:cardId")
};

export const EmbedApi = {
    card:                        GET(embedBase + "/card/:token"),
    cardQuery:                   GET(embedBase + "/card/:token/query"),
    dashboard:                   GET(embedBase + "/dashboard/:token"),
    dashboardCardQuery:          GET(embedBase + "/dashboard/:token/dashcard/:dashcardId/card/:cardId")
};

export const EmailApi = {
    updateSettings:              PUT(root + "api/email"),
    sendTest:                   POST(root + "api/email/test"),
};

export const SlackApi = {
    updateSettings:              PUT(root + "api/slack/settings"),
};

export const MetabaseApi = {
    db_list:                     GET(root + "api/database"),
    db_list_with_tables:         GET(root + "api/database?include_tables=true"),
    db_create:                  POST(root + "api/database"),
    db_add_sample_dataset:      POST(root + "api/database/sample_dataset"),
    db_get:                      GET(root + "api/database/:dbId"),
    db_update:                   PUT(root + "api/database/:id"),
    db_delete:                DELETE(root + "api/database/:dbId"),
    db_metadata:                 GET(root + "api/database/:dbId/metadata"),
    // db_tables:                   GET(root + "api/database/:dbId/tables"),
    db_fields:                   GET(root + "api/database/:dbId/fields"),
    db_idfields:                 GET(root + "api/database/:dbId/idfields"),
    db_autocomplete_suggestions: GET(root + "api/database/:dbId/autocomplete_suggestions?prefix=:prefix"),
    db_sync_metadata:           POST(root + "api/database/:dbId/sync"),
    table_list:                  GET(root + "api/table"),
    // table_get:                   GET(root + "api/table/:tableId"),
    table_update:                PUT(root + "api/table/:id"),
    // table_fields:                GET(root + "api/table/:tableId/fields"),
    table_fks:                   GET(root + "api/table/:tableId/fks"),
    // table_reorder_fields:       POST(root + "api/table/:tableId/reorder"),
    table_query_metadata:        GET(root + "api/table/:tableId/query_metadata", async (table) => {
                                    // HACK: inject GA metadata that we don't have intergrated on the backend yet
                                    if (table && table.db && table.db.engine === "googleanalytics") {
                                        let GA = await getGAMetadata();
                                        table.fields = table.fields.map(f => ({ ...f, ...GA.fields[f.name] }));
                                        table.metrics.push(...GA.metrics);
                                        table.segments.push(...GA.segments);
                                    }
                                    return table;
                                 }),
    // table_sync_metadata:        POST(root + "api/table/:tableId/sync"),
    // field_get:                   GET(root + "api/field/:fieldId"),
    // field_summary:               GET(root + "api/field/:fieldId/summary"),
    // field_values:                GET(root + "api/field/:fieldId/values"),
    // field_value_map_update:     POST(root + "api/field/:fieldId/value_map_update"),
    field_update:                PUT(root + "api/field/:id"),
    dataset:                    POST(root + "api/dataset"),
    dataset_duration:           POST(root + "api/dataset/duration"),
};

export const PulseApi = {
    list:                        GET(root + "api/pulse"),
    create:                     POST(root + "api/pulse"),
    get:                         GET(root + "api/pulse/:pulseId"),
    update:                      PUT(root + "api/pulse/:id"),
    delete:                   DELETE(root + "api/pulse/:pulseId"),
    test:                       POST(root + "api/pulse/test"),
    form_input:                  GET(root + "api/pulse/form_input"),
    preview_card:                GET(root + "api/pulse/preview_card_info/:id"),
};

export const SegmentApi = {
    list:                        GET(root + "api/segment"),
    create:                     POST(root + "api/segment"),
    get:                         GET(root + "api/segment/:segmentId"),
    update:                      PUT(root + "api/segment/:id"),
    delete:                   DELETE(root + "api/segment/:segmentId"),
};

export const MetricApi = {
    list:                        GET(root + "api/metric"),
    create:                     POST(root + "api/metric"),
    get:                         GET(root + "api/metric/:metricId"),
    update:                      PUT(root + "api/metric/:id"),
    update_important_fields:     PUT(root + "api/metric/:metricId/important_fields"),
    delete:                   DELETE(root + "api/metric/:metricId"),
};

export const RevisionApi = {
    list:                        GET(root + "api/revision"),
    revert:                     POST(root + "api/revision/revert"),
};

export const RevisionsApi = {
    get:                         GET(root + "api/:entity/:id/revisions"),
};

export const LabelApi = {
    list:                        GET(root + "api/label"),
    create:                     POST(root + "api/label"),
    update:                      PUT(root + "api/label/:id"),
    delete:                   DELETE(root + "api/label/:id"),
};

export const SessionApi = {
    create:                     POST(root + "api/session"),
    createWithGoogleAuth:       POST(root + "api/session/google_auth"),
    delete:                   DELETE(root + "api/session"),
    properties:                  GET(root + "api/session/properties"),
    forgot_password:            POST(root + "api/session/forgot_password"),
    reset_password:             POST(root + "api/session/reset_password"),
    password_reset_token_valid:  GET(root + "api/session/password_reset_token_valid"),
};

export const SettingsApi = {
    list:                        GET(root + "api/setting"),
    put:                         PUT(root + "api/setting/:key"),
    // setAll:                      PUT(root + "api/setting"),
    // delete:                   DELETE(root + "api/setting/:key"),
};

export const PermissionsApi = {
    groups:                      GET(root + "api/permissions/group"),
    groupDetails:                GET(root + "api/permissions/group/:id"),
    graph:                       GET(root + "api/permissions/graph"),
    updateGraph:                 PUT(root + "api/permissions/graph"),
    createGroup:                POST(root + "api/permissions/group"),
    memberships:                 GET(root + "api/permissions/membership"),
    createMembership:           POST(root + "api/permissions/membership"),
    deleteMembership:         DELETE(root + "api/permissions/membership/:id"),
    updateGroup:                 PUT(root + "api/permissions/group/:id"),
    deleteGroup:              DELETE(root + "api/permissions/group/:id"),
};

export const GettingStartedApi = {
    get:                         GET(root + "api/getting_started"),
};

export const SetupApi = {
    create:                     POST(root + "api/setup"),
    validate_db:                POST(root + "api/setup/validate"),
};

export const UserApi = {
    create:                     POST(root + "api/user"),
    list:                        GET(root + "api/user"),
    current:                     GET(root + "api/user/current"),
    // get:                         GET(root + "api/user/:userId"),
    update:                      PUT(root + "api/user/:id"),
    update_password:             PUT(root + "api/user/:id/password"),
    update_qbnewb:               PUT(root + "api/user/:id/qbnewb"),
    delete:                   DELETE(root + "api/user/:userId"),
    send_invite:                POST(root + "api/user/:id/send_invite"),
};

export const UtilApi = {

    password_check:             POST(root + "api/util/password_check"),
    random_token:                GET(root + "api/util/random_token"),

};

global.services = exports;
