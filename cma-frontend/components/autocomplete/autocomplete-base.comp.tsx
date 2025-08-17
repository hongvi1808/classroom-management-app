'use client'

import { Autocomplete, AutocompleteProps } from "@mui/material"
import { TextFieldBase, TextFiledControlBase } from "../textfield/textfield.comp"
import { useEffect, useState } from "react";

type AutocompleteBaseProps<
  T,
  Multiple extends boolean | undefined = false,
  DisableClearable extends boolean | undefined = false,
  FreeSolo extends boolean | undefined = false
> = AutocompleteProps<T, Multiple, DisableClearable, FreeSolo> & {
  label?: string;
  name: string
  default?: any;
};

export function AutocompleteBase<T, Multiple extends boolean | undefined = false>(props: AutocompleteBaseProps<T, Multiple, true, false>) {
  const [selected, setSelected] = useState<any>();

useEffect(() => {
  if (props.default) setSelected(props.default);
}, [props.default]);

  return (<Autocomplete
    fullWidth
    {...props}
    sx={{
      "& .MuiOutlinedInput-root": {
        paddingY: 0,
      },
    }}
    value={selected || props.defaultValue || null}
    onChange={(e, newValue) =>setSelected(newValue)}
    renderInput={(params) => <TextFiledControlBase inputProps={{ ...params }} name={props.name} label={props.label} />}
  />)
}