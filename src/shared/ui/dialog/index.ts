import { Dialog as DialogRoot } from "./Dialog";
import { DialogActions } from "./DialogActions";
import { DialogCancelButton } from "./DialogCancelButton";
import { DialogConfirmButton } from "./DialogConfirmButton";
import { DialogContent } from "./DialogContent";
import { DialogRadioGroup } from "./DialogRadioGroup";
import { DialogRadioItem } from "./DialogRadioItem";
import { DialogSelectButton } from "./DialogSelectButton";
import { DialogSelectGroup } from "./DialogSelectGroup";
import { DialogTitle } from "./DialogTitle";

export const Dialog = Object.assign(DialogRoot, {
	Title: DialogTitle,
	Content: DialogContent,
	Actions: DialogActions,
	CancelButton: DialogCancelButton,
	ConfirmButton: DialogConfirmButton,
	SelectGroup: DialogSelectGroup,
	SelectButton: DialogSelectButton,
	RadioGroup: DialogRadioGroup,
	RadioItem: DialogRadioItem,
});

export type {
	DialogRadioContextValue,
	DialogSelectContextValue,
} from "./types";
