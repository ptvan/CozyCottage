library("tmap")
library("tmaptools")

# load in our street addresses
dat <- read.csv("data/cozycottage_data.csv")
dat$address <- as.character(dat$address)
dat$lat <- ""
dat$lon <- ""

# to display the street locations we need lat and lon of each address
# we query these from OpenStreetMap, which doesn't require API keys or logins. 
# OSM returns bounding boxes as well, but we just need a point location
# be kind on OSM servers by pausing between queries 

for (i in 1:nrow(dat)) {
  cat(dat$address[i], "\n")
  out <- geocode_OSM(paste(dat$address[i], "Seattle, WA"), as.data.frame = T)
  dat[i,]$lat <- out$lat
  dat[i,]$lon <- out$lon
  Sys.sleep(2)
}

# write out to a new CSV
write.csv(dat, "data/cozycottage_data_latlon.csv", quote = F, row.names = F)
