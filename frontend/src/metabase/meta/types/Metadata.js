/* @flow */

// Legacy "tableMetadata" etc

import type { Table } from "metabase/meta/types/Table";
import type { Field } from "metabase/meta/types/Field";
import type { Segment } from "metabase/meta/types/Segment";

export type FieldValue = {
    name: string,
    key: string
}

export type OperatorName = string;

export type Operator = {
    name: OperatorName,
    verboseName: string,
    moreVerboseName: string,
    fields: OperatorField[],
    multi: bool,
    advanced: bool,
    placeholders?: string[],
    validArgumentsFilters: ValidArgumentsFilter[],
}

export type OperatorField = {
    type: string,
    values: FieldValue[]
}

export type ValidArgumentsFilter = (field: Field, table: Table) => bool;

export type FieldMetadata = Field & {
    operators_lookup: { [name: string]: Operator }
}

export type TableMetadata = Table & {
    segments: Segment[],
    fields: FieldMetadata[]
}
