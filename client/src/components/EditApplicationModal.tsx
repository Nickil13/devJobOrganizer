import {
    Button,
    Checkbox,
    Dialog,
    DialogContent,
    DialogTitle,
    FormControl,
    FormControlLabel,
    InputLabel,
    ListItemText,
    MenuItem,
    OutlinedInput,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
} from "@mui/material";

import React, { useEffect, useState } from "react";
import CloseIcon from "@mui/icons-material/Close";
import {
    ApplicationContext,
    ApplicationContextType,
} from "../context/applicationContext";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import LocalizationProvider from "@mui/lab/LocalizationProvider";
import { DatePicker } from "@mui/lab";
import { formatDateString } from "../utilities/formatDateString";
import { Application } from "../typings/typings";
import { tech as stackData } from "../data/stackTech";

interface Props {
    closeDialog(): void;
    isDialogOpen: boolean;
    currentApplication: Application | undefined;
}
const EditApplicationModal: React.FC<Props> = ({
    closeDialog,
    isDialogOpen,
    currentApplication,
}) => {
    const [name, setName] = useState<string>("");
    const [position, setPosition] = useState<string>("");
    const [date, setDate] = useState<string>("");
    const [stage, setStage] = useState<string>("");
    const [stack, setStack] = useState<string[]>([]);
    const [listingURL, setListingURL] = useState<string>("");
    const [websiteURL, setWebsiteURL] = useState<string>("");

    const [city, setCity] = useState<string>("");
    const [province, setProvince] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [postalCode, setPostalCode] = useState<string>("");
    const [isRemote, setIsRemote] = useState<boolean>(false);

    const ITEM_HEIGHT = 48;
    const ITEM_PADDING_TOP = 8;
    const MenuProps = {
        PaperProps: {
            style: {
                maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
                width: 250,
            },
        },
    };
    const { updateApplication } = React.useContext(
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
            stack: [...stack],
            listingURL,
            websiteURL,
        };

        if (currentApplication?._id) {
            try {
                updateApplication(currentApplication._id, newApplication);
                closeDialog();
            } catch (error) {
                console.log(error);
            }
        } else {
            console.log("ID is undefined");
        }
    };

    const onSelectChange = (event: SelectChangeEvent): void => {
        const val = event.target.value;
        setStage(val);
    };

    const onStackSelectChange = (
        event: SelectChangeEvent<typeof stack>
    ): void => {
        const val = event.target.value;
        setStack(typeof val === "string" ? val.split(",") : val);
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

    useEffect(() => {
        if (currentApplication) {
            const {
                name,
                position,
                date,
                stage,
                listingURL,
                websiteURL,
                location: { city, province, address, postalCode, remote },
            } = currentApplication;
            setName(name);
            setPosition(position);
            setDate(date);
            setStage(stage);
            setListingURL(listingURL);
            setWebsiteURL(websiteURL);
            setCity(city);
            setProvince(province);
            if (address) setAddress(address);
            if (postalCode) setPostalCode(postalCode);
            setIsRemote(remote);
        }
    }, []);
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
                    Edit Application to {name}
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
                                    <MenuItem value="Closed">Closed</MenuItem>
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
                                value={city}
                                onChange={onChange("city")}
                            />

                            <TextField
                                id="province"
                                label="Province"
                                variant="filled"
                                size="small"
                                required
                                value={province}
                                onChange={onChange("province")}
                            />
                            <TextField
                                id="address"
                                label="Address"
                                variant="filled"
                                size="small"
                                value={address}
                                onChange={onChange("address")}
                            />
                            <TextField
                                id="postal-code"
                                label="Postal Code"
                                variant="filled"
                                size="small"
                                value={postalCode}
                                onChange={onChange("postal-code")}
                            />
                            <FormControlLabel
                                control={<Checkbox />}
                                label="Remote"
                                value={isRemote}
                                onChange={(e: React.SyntheticEvent) =>
                                    setIsRemote(
                                        (e.target as HTMLInputElement).checked
                                    )
                                }
                            />
                        </Stack>
                        <FormControl size="small">
                            <InputLabel htmlFor="application-stack-label">
                                Tech Stack
                            </InputLabel>
                            <Select
                                labelId="application-stack-label"
                                id="application-stack"
                                multiple
                                value={stack}
                                onChange={onStackSelectChange}
                                input={<OutlinedInput label="Tag" />}
                                renderValue={(selected) => selected.join(", ")}
                                MenuProps={MenuProps}
                            >
                                {stackData.map((item, index) => {
                                    return (
                                        <MenuItem key={index} value={item.name}>
                                            <Checkbox
                                                checked={
                                                    stack.indexOf(item.name) >
                                                    -1
                                                }
                                            />
                                            <ListItemText primary={item.name} />
                                        </MenuItem>
                                    );
                                })}
                            </Select>
                        </FormControl>
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

export default EditApplicationModal;
