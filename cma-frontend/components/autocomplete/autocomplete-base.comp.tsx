'use client'

import { Autocomplete, AutocompleteProps } from "@mui/material"
import { TextFieldBase, TextFiledControlBase } from "../textfield/textfield.comp"
import { useEffect, useState } from "react";
import { validRequire } from "@/base/uitls";
import { Prosto_One } from "next/font/google";

type AutocompleteBaseProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
  label?: string;
  name: string
  default?: any;
  required?: boolean
  values?: (value: any) => void
};

export function AutocompleteBase<T, Multiple extends boolean | undefined = false>(props: AutocompleteBaseProps<T, Multiple, true, false>) {
  const [selected, setSelected] = useState<any>();

  useEffect(() => {
    if (props.default) setSelected(props.default);
  }, [props.default]);
  const handleOnBlur = (e: any) => {
    if (props.values)  props.values(selected)
  }
  return (<>
    <Autocomplete
      fullWidth
      // {...props}
      options={props.options}
      sx={!props.multiple ? {
        "& .MuiOutlinedInput-root": {
          paddingY: 0,
        },
      }: {}}
      value={selected || props.defaultValue || (props.multiple ? []: null)}
      onChange={(e, newValue) => setSelected(newValue)}
      onBlur={handleOnBlur}
      renderInput={(params) => <TextFiledControlBase inputProps={{ ...params }} name={props.name} getErrorMessage={(v) => props.required ?validRequire(v): ''} label={props.label} />}
    />

  </>)
}