import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from "@mui/material";

import React, { useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    ApplicationContext,
    ApplicationContextType,
} from "../context/applicationContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { formatDateString } from "../utilities/formatDateString";

interface Props {
    closeDialog(): void;
    isDialogOpen: boolean;
}
const ApplicationModal: React.FC<Props> = ({ closeDialog, isDialogOpen }) => {
    const [name, setName] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [stage, setStage] = useState<string>("");
    const [listingURL, setListingURL] = useState<string>("");
    const [websiteURL, setWebsiteURL] = useState<string>("");

    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [isRemote, setIsRemote] = useState<boolean>(false);

    const { createApplication } = React.useContext(
        ApplicationContext
    ) as ApplicationContextType;

    const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const newApplication = {
            name,
            position,
            date: date ? date : new Date().toDateString(),
            location: {
                city,
                province,
                address,
                postalCode,
                remote: isRemote,
            },
            stage,
            stack: [],
            listingURL,
            websiteURL,
        };

        try {
            createApplication(newApplication);
            closeDialog();
        } catch (error) {
            console.log(error);
        }
    };

    const onSelectChange = (event: SelectChangeEvent): void => {
        const val = event.target.value;
        setStage(val);
    };

    const onChange =
        (type: string) =>
        (event: React.ChangeEvent<HTMLInputElement>): void => {
            const val = event.target.value;
            switch (type) {
                case "name":
                    setName(val);
                    break;

                case "position":
                    setPosition(val);
                    break;

                case "date":
                    setDate(val);
                    break;

                case "listing-url":
                    setListingURL(val);
                    break;

                case "website-url":
                    setWebsiteURL(val);
                    break;

                case "city":
                    setCity(val);
                    break;

                case "province":
                    setProvince(val);
                    break;

                case "address":
                    setAddress(val);
                    break;

                case "postal-code":
                    setPostalCode(val);
                    break;

                default:
            }
        };

    return (
        <div>
            <Dialog
                className="application-modal"
                open={isDialogOpen}
                onClose={closeDialog}
                aria-labelledby="add-application-modal"
            >
                <span className="close-modal" onClick={closeDialog}>
                    <CloseIcon />
                </span>
                <DialogTitle sx={{ padding: "30px" }}>
                    Add Application
                </DialogTitle>
                <DialogContent>
                    <form onSubmit={onSubmit}>
                        <Stack direction="row" spacing={2}>
                            <FormControl size="small">
                                <InputLabel htmlFor="application-name-input">
                                    Name
                                </InputLabel>
                                <OutlinedInput
                                    id="application-name-input"
                                    name="name"
                                    type="text"
                                    onChange={onChange("name")}
                                    value={name}
                                    label="Name"
                                    required
                                />
                            </FormControl>
                            <FormControl size="small">
                                <InputLabel htmlFor="application-position-input">
                                    Position
                                </InputLabel>
                                <OutlinedInput
                                    id="application-position-input"
                                    name="position"
                                    type="text"
                                    onChange={onChange("position")}
                                    value={position}
                                    label="Position"
                                    required
                                />
                            </FormControl>
                        </Stack>
                        <Stack direction="row" spacing={2}>
                            <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DatePicker
                                    label="Date"
                                    value={date}
                                    onChange={(newDate) =>
                                        setDate(
                                            newDate
                                                ? formatDateString(newDate)
                                                : ""
                                        )
                                    }
                                    renderInput={(params) => (
                                        <TextField {...params} />
                                    )}
                                />
                            </LocalizationProvider>
                            <FormControl size="small">
                                <Select
                                    name="stage"
                                    value={stage}
                                    onChange={onSelectChange}
                                    autoWidth
                                    displayEmpty
                                    required
                                >
                                    <MenuItem value="" disabled>
                                        Application Stage
                                    </MenuItem>
                                    <MenuItem value="Building Cover Letter">
                                        Building Cover Letter
                                    </MenuItem>
                                    <MenuItem value="Application Sent">
                                        Application Sent
                                    </MenuItem>
                                    <MenuItem value="No Offer">
                                        No Offer
                                    </MenuItem>
                                    <MenuItem value="On-Site Interview">
                                        On-Site Interview
                                    </MenuItem>
                                    <MenuItem value="Online Interview">
                                        Online Interview
                                    </MenuItem>
                                    <MenuItem value="Offer">Offer</MenuItem>
                                </Select>
                            </FormControl>
                        </Stack>
                        <Stack
                            direction="row"
                            spacing={2}
                            className="location-inputs"
                        >
                            <TextField
                                id="city"
                                label="City"
                                variant="filled"
                                size="small"
                                required
                                onChange={onChange("city")}
                            />

                            <TextField
                                id="province"
                                label="Province"
                                variant="filled"
                                size="small"
                                required
                                onChange={onChange("province")}
                            />
                            <TextField
                                id="address"
                                label="Address"
                                variant="filled"
                                size="small"
                                onChange={onChange("address")}
                            />
                            <TextField
                                id="postal-code"
                                label="Postal Code"
                                variant="filled"
                                size="small"
                                onChange={onChange("postal-code")}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remote"
                                onChange={(e: React.SyntheticEvent) =>
                                    setIsRemote(
                                        (e.target as HTMLInputElement).checked
                                    )
                                }
                            />
                        </Stack>
                        <FormControl size="small">
                            <InputLabel htmlFor="application-listing-input">
                                Listing URL
                            </InputLabel>
                            <OutlinedInput
                                id="application-listing-input"
                                name="listing"
                                type="text"
                                onChange={onChange("listing-url")}
                                value={listingURL}
                                label="Listing URL"
                                required
                            ></OutlinedInput>
                        </FormControl>
                        <FormControl size="small">
                            <InputLabel htmlFor="application-website-input">
                                Website URL
                            </InputLabel>
                            <OutlinedInput
                                id="application-website-input"
                                name="website"
                                type="text"
                                onChange={onChange("website-url")}
                                value={websiteURL}
                                label="Website URL"
                                required
                            ></OutlinedInput>
                        </FormControl>
                        <Button type="submit">Submit</Button>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default ApplicationModal;
