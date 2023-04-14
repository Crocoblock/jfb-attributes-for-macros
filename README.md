# JetFormBuilder - additional attributes
A lightweight addon for JetFormBuilder 3+ which add attributes for frontend macros

## Available attributes

### `optionLabel`
- **Description:** it is used to display or save the names of the selected options in the Checkbox Field, Radio Field, Select Field blocks.
- **Example:** `<!--JFB_FIELD::check_box_name(optionLabel)-->` (for field description, html block or paragraph), `%check_box_name(optionLabel)%` (for calculated field or in Default Value option)

## Quick Start
1. Copy the blocks found below
```html
<!-- wp:jet-forms/checkbox-field {"field_options":[{"label":"First Option","value":"1","calculate":""},{"label":"Second Option","value":"2","calculate":""},{"label":"Third Option","value":"3","calculate":""}],"label":"test label","name":"test_label","desc":"Selected: \u003c!\u002d\u002dJFB_FIELD::test_label(optionLabel)\u002d\u002d\u003e","default":"2"} /-->

<!-- wp:jet-forms/radio-field {"field_options":[{"label":"First Option","value":"1","calculate":""},{"label":"Second Option","value":"2","calculate":""},{"label":"Third Option","value":"3","calculate":""}],"label":"tesrs radio","name":"tesrs_radio","desc":"Selected: \u003c!\u002d\u002dJFB_FIELD::tesrs_radio(optionLabel)\u002d\u002d\u003e","default":"2"} /-->

<!-- wp:jet-forms/select-field {"field_options":[{"label":"First Option","value":"1","calculate":""},{"label":"Second Option","value":"2","calculate":""},{"label":"Third Option","value":"3","calculate":""}],"field_options_post_type":"page","label":"select one","name":"select_one","desc":"Selected: \u003c!\u002d\u002dJFB_FIELD::select_one(optionLabel)\u002d\u002d\u003e"} /-->

<!-- wp:jet-forms/select-field {"multiple":true,"multiple_size":5,"field_options":[{"label":"First Option","value":"1","calculate":""},{"label":"Second Option","value":"2","calculate":""},{"label":"Third Option","value":"3","calculate":""},{"label":"Fourth Option","value":"4","calculate":""},{"label":"Fifth Option","value":"5","calculate":""}],"field_options_post_type":"page","label":"select multiple","name":"select_one_copy","desc":"Selected: \u003c!\u002d\u002dJFB_FIELD::select_one_copy(optionLabel)\u002d\u002d\u003e"} /-->
```
2. Open or create a new JetFormBuilder form
3. Click on the three dots in the upper right corner and select "Code Editor"
![image](https://user-images.githubusercontent.com/46720998/231992226-b144d23f-138e-4428-95e1-81d41ae1c830.png)
4. Paste the copied blocks at the very end of the content.
5. Check the result
![image](https://user-images.githubusercontent.com/46720998/231993191-447a0bb5-7378-440d-b4b9-2239b75bfd3b.png)